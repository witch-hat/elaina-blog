import { gql, AuthenticationError, UserInputError, ApolloError } from 'apollo-server';
import { ContextType } from '../types/context';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { config } from '../util/config';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'cookies';
import UAParser from 'ua-parser-js';
import os from 'os';
import defaultGateway, { Gateway } from 'default-gateway';

import { UserModel, User, Auth } from '../model/user';
import { comparePassword, getToken, verifyToken } from '../util/auth';

const SALT = 10;

interface MACList {
  [str: string]: {
    ipv6: string;
    mac: string;
    ipv4: string;
  };
}

export const userTypeDef = gql`
  type User {
    _id: ID
    emailId: String
    password: String
  }

  type AuthResponse {
    isAuth: Boolean
    cookie: [String]
  }

  type LoginDevice {
    userUniqueId: String
    latestLogin: DateTime
  }

  extend type Query {
    me: User
    findMeById: User
    isAuth: AuthResponse
    findDevices: [LoginDevice]
  }

  extend type Mutation {
    updatePassword(old: String!, new: String!, confirm: String!): Void
    login(emailId: String!, password: String!): MutationResponse
    logout: Void
    refreshUserToken(userId: ID!): User
  }
`;

const FIVE_MINUTE = 60 * 5;
const MONTH = 1000 * 60 * 60 * 24 * 30;

export const userResolver = {
  Query: {
    async me() {
      try {
        const user: User | null = await UserModel.findById(1);
        return user;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    async isAuth(_: any, args: any, context: ContextType) {
      // create device + browser unique id string
      const networkInterfaces = os.networkInterfaces();
      const gateway: Gateway = await defaultGateway.v4();
      const userEthernetInterfaceName = gateway.interface;
      const userEthernetInterface = networkInterfaces[userEthernetInterfaceName];
      const userIPv4Interface = userEthernetInterface?.find((eInterface) => eInterface.family === 'IPv4');

      const ua = new UAParser(context.req.headers['user-agent']);
      const browserName = ua.getBrowser().name;
      const userUniqueId = userIPv4Interface?.mac! + userIPv4Interface?.address! + browserName;

      const cookies = new Cookies(context.req, context.res);
      const accessToken = cookies.get('a_access');
      const refreshToken = cookies.get('a_refresh');

      // token undefined error
      if (!accessToken || !refreshToken) {
        return { isAuth: false };
      }

      const me = await UserModel.findOne({}, {}, { sort: { _id: -1 } });
      if (me) {
        const authList: Array<Auth> = me.auth;

        try {
          // 기기 id가 리스트에 없으면 re-login 유도(isAuth false)
          if (authList.find((auth) => auth.userUniqueId === userUniqueId) === undefined) {
            return { isAuth: false };
          } else {
            // 기기 id가 리스트에 있고, verify success시 isAuth true
            jwt.verify(accessToken, config.secret);
            return { isAuth: true };
          }
        } catch (err) {
          // 만약 authlist에 id가 있으면 refreshToken check 후 accessToken, refreshToken 발급
          // refresh tokens
          if (err instanceof TokenExpiredError) {
            try {
              // authList에 있는 auth중 uniqueid 찾기
              const authIndex = authList.findIndex((auth) => auth.userUniqueId === userUniqueId);
              const isMatch = await bcrypt.compare(me.auth[authIndex].refreshToken, refreshToken);
              if (isMatch) {
                // re-generate access, refresh token
                const id = uuidv4();
                me.auth[authIndex].id = id;

                const payload = {
                  refreshTokenId: id
                };

                const accessToken = getToken(payload, FIVE_MINUTE);
                const refreshToken = getToken(payload, MONTH);

                const hashedRefreshToken = await bcrypt.hash(refreshToken, SALT);
                cookies.set('a_refresh', hashedRefreshToken, {
                  httpOnly: false,
                  sameSite: 'strict',
                  secure: false
                });

                me.auth[authIndex].refreshToken = refreshToken;
                me.auth[authIndex].latestLogin = new Date();
                me.save();

                cookies.set('a_access', accessToken, {
                  httpOnly: false,
                  sameSite: 'strict',
                  secure: false
                });

                // context.res.getHeader('set-cookie') return Array<string> type
                return { isAuth: true, cookie: context.res.getHeader('set-cookie') };
              } else {
                context.res.clearCookie('a_access');
                context.res.clearCookie('a_refresh');

                return { isAuth: false };
              }
            } catch (err) {
              context.res.clearCookie('a_access');
              context.res.clearCookie('a_refresh');

              return { isAuth: false };
            }
          } else {
            context.res.clearCookie('a_access');
            context.res.clearCookie('a_refresh');
            return { isAuth: false };
            // malformed error is prior than expired error
          }
        }
      }
    },

    async findDevices(_: any, args: any, context: ContextType) {
      try {
        const user: User | null = await UserModel.findById(1);

        if (user) {
          const result = user.auth.map((device) => {
            return {
              userUniqueId: device.userUniqueId,
              latestLogin: device.latestLogin
            };
          });
          return result;
        }
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    async updatePassword(_: any, args: { old: string; new: string; confirm: string }, context: ContextType) {
      const networkInterfaces = os.networkInterfaces();
      const gateway: Gateway = await defaultGateway.v4();
      const userEthernetInterfaceName = gateway.interface;
      const userEthernetInterface = networkInterfaces[userEthernetInterfaceName];
      const userIPv4Interface = userEthernetInterface?.find((eInterface) => eInterface.family === 'IPv4');

      const ua = new UAParser(context.req.headers['user-agent']);
      const browserName = ua.getBrowser().name;
      const userUniqueId = userIPv4Interface?.mac! + userIPv4Interface?.address! + browserName;

      const newPasswordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');

      try {
        if (args.new !== args.confirm) {
          throw new UserInputError('새 비밀번호가 일치하지 않습니다.');
        }

        if (args.new.match(newPasswordRegex) === null) {
          throw new UserInputError('잘못된 비밀번호 양식입니다.');
        }

        const me = await UserModel.findById(1);

        if (me) {
          const isMatch = await comparePassword(args.old, me.password);

          if (isMatch) {
            if (args.old === args.new) throw new UserInputError('이전과 동일한 비밀번호 입니다.');

            me.password = args.new;
            me.auth = me.auth.filter((auth) => auth.userUniqueId === userUniqueId);
            me.save();
          } else {
            throw new AuthenticationError('패스워드 정보가 일치하지 않습니다.');
          }
        }
      } catch (err) {
        throw err;
      }
    },

    async login(_: any, args: { emailId: string; password: string }, context: ContextType) {
      const emailRegExp =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (args.password.length < 8 || args.password.length > 20) {
        throw new UserInputError('비밀번호 8 ~ 20자 입력해주세요');
      } else if (args.emailId.match(emailRegExp) === null) {
        throw new UserInputError('이메일을 입력해 주세요');
      }

      const networkInterfaces = os.networkInterfaces();
      const gateway: Gateway = await defaultGateway.v4();
      const userEthernetInterfaceName = gateway.interface;
      const userEthernetInterface = networkInterfaces[userEthernetInterfaceName];
      const userIPv4Interface = userEthernetInterface?.find((eInterface) => eInterface.family === 'IPv4');

      const ua = new UAParser(context.req.headers['user-agent']);
      let browserName = ua.getBrowser().name;

      // Need to fix
      if (browserName === undefined) browserName = 'Firefox';

      const userUniqueId = userIPv4Interface?.mac! + userIPv4Interface?.address! + browserName;

      const cookies = new Cookies(context.req, context.res);
      try {
        const me = await UserModel.findById(1);
        if (me) {
          const authList = me.auth;

          if (args.emailId === me.emailId) {
            const isMatch = await comparePassword(args.password, me.password);

            if (isMatch) {
              const id = uuidv4();
              const payload = {
                refreshTokenId: id
              };

              const accessToken = getToken(payload, FIVE_MINUTE);
              const refreshToken = getToken(payload, MONTH);

              const authIndex = authList.findIndex((auth) => auth.userUniqueId === userUniqueId);
              const latestLogin = new Date();

              if (authIndex === -1) {
                me.auth.push({ userUniqueId, refreshToken, id, latestLogin });
              } else {
                me.auth[authIndex].refreshToken = refreshToken;
                me.auth[authIndex].id = id;
                me.auth[authIndex].latestLogin = latestLogin;
              }
              me.save();

              await bcrypt
                .hash(refreshToken, SALT)
                .then((hashedRefreshToken) => {
                  cookies.set('a_refresh', hashedRefreshToken, {
                    httpOnly: false,
                    sameSite: 'strict',
                    secure: false
                  });
                })
                .catch((err) => console.error(err));

              cookies.set('a_access', accessToken, {
                httpOnly: false,
                sameSite: 'strict',
                secure: false
              });

              return { isSuccess: true };
            } else {
              throw new AuthenticationError('이메일 또는 비밀번호가 맞지 않습니다.');
            }
          } else {
            throw new AuthenticationError('이메일 또는 비밀번호가 맞지 않습니다.');
          }
        }
      } catch (err) {
        throw err;
      }
    },

    async logout(_: any, args: any, context: ContextType) {
      const networkInterfaces = os.networkInterfaces();
      const gateway: Gateway = await defaultGateway.v4();
      const userEthernetInterfaceName = gateway.interface;
      const userEthernetInterface = networkInterfaces[userEthernetInterfaceName];
      const userIPv4Interface = userEthernetInterface?.find((eInterface) => eInterface.family === 'IPv4');

      const ua = new UAParser(context.req.headers['user-agent']);
      const browserName = ua.getBrowser().name;
      const userUniqueId = userIPv4Interface?.mac! + userIPv4Interface?.address! + browserName;

      const cookies = new Cookies(context.req, context.res);

      try {
        const me = await UserModel.findById(1);
        if (me) {
          const deleteResultAuth = me.auth.filter((authInfo) => {
            return authInfo.userUniqueId !== userUniqueId;
          });

          me.auth = deleteResultAuth;
          me.save();

          cookies.set('a_refresh', '', {
            expires: new Date(0)
          });
          cookies.set('a_access', '', {
            expires: new Date(0)
          });
        }

        return null;
      } catch (err) {
        throw err;
      }
    }
  }
};
