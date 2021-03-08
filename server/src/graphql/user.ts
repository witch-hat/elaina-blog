import { gql, AuthenticationError, Request } from 'apollo-server';
import express from 'express';
import { UserModel, User, Auth } from '../model/user';
import { comparePassword, getToken, verifyToken } from '../util/auth';
import { ContextType } from '../types/context';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { config } from '../util/config';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'cookies';
import macaddress from 'macaddress';
import UAParser from 'ua-parser-js';

const saltRounds = 10;

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

  type Auth {
    deviceList: [String]
    refreshToken: String
    id: String
  }

  type LoginResponse {
    auth: Auth
    cookie: String
  }

  type LogoutResponse {
    logout: Boolean
  }

  extend type Query {
    me: User
    findMeById: User
    isAuth: AuthResponse
  }

  extend type Mutation {
    updatePassword(emailId: String, password: String): User

    login(emailId: String!, password: String!): LoginResponse

    logout: LogoutResponse

    refreshUserToken(userId: ID!): User
  }
`;

const FIVE_MINUTE = 60 * 5;
const MONTH = 1000 * 60 * 60 * 24 * 30;

export const userResolver = {
  Query: {
    async me() {
      try {
        const user = await UserModel.find();
        return user[user.length - 1];
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    async findMeById(id: string) {
      try {
        const user = await UserModel.findById(id);
        return user;
      } catch (err) {
        throw err;
      }
    },

    async isAuth(_: any, args: any, context: ContextType) {
      // create device + browser unique id string
      const macList: MACList = await macaddress.all();
      const mac = Object.values(macList)[0];
      const ua = new UAParser(context.req.headers['user-agent']);
      const browserName = ua.getBrowser().name;
      const userUniqueId = mac.mac + mac.ipv4 + browserName;

      // browser name undefined error
      if (browserName === 'undefined') {
        throw new Error('browser name undefined');
      }

      const cookies = new Cookies(context.req, context.res);
      const accessToken = cookies.get('a_access');
      const refreshToken = cookies.get('a_refresh');

      // token undefined error
      if (!accessToken || !refreshToken) {
        return { isAuth: false };
      }

      const me = await UserModel.findOne({}, {}, { sort: { _id: -1 } });
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

              const hashedRefreshToken = await bcrypt.hash(refreshToken, saltRounds);
              cookies.set('a_refresh', hashedRefreshToken, {
                httpOnly: false
              });

              me.auth[authIndex].refreshToken = refreshToken;
              me.save();

              cookies.set('a_access', accessToken, {
                httpOnly: false
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
  Mutation: {
    async updatePassword(_: any, args: any) {
      try {
        const result = await UserModel.create({
          emailId: args.emailId,
          password: args.password
        });
        return result;
      } catch (err) {
        throw err;
      }
    },

    async login(_: any, args: any, context: ContextType) {
      const macList: MACList = await macaddress.all();
      const mac = Object.values(macList)[0];
      const ua = new UAParser(context.req.headers['user-agent']);
      const browserName = ua.getBrowser().name;
      const userUniqueId = mac.mac + mac.ipv4 + browserName;

      const cookies = new Cookies(context.req, context.res);
      try {
        const me: User = await UserModel.findOne({}, {}, { sort: { _id: -1 } });
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
            if (authIndex === -1) {
              me.auth.push({ userUniqueId, refreshToken, id });
              me.save();
            } else {
              me.auth[authIndex].refreshToken = refreshToken;
              me.auth[authIndex].id = id;
              me.save();
            }

            await bcrypt
              .hash(refreshToken, saltRounds)
              .then((hashedRefreshToken) => {
                cookies.set('a_refresh', hashedRefreshToken, {
                  httpOnly: false,
                  secure: false
                });
              })
              .catch((err) => console.error(err));

            cookies.set('a_access', accessToken, {
              httpOnly: false,
              secure: false
            });

            return { accessToken, me };
          } else {
            throw new AuthenticationError('이메일 또는 비밀번호가 맞지 않습니다.');
          }
        } else {
          throw new AuthenticationError('이메일 또는 비밀번호가 맞지 않습니다.');
        }
      } catch (err) {
        throw err;
      }
    },

    async logout(_: any, args: any, context: ContextType) {
      const macList: MACList = await macaddress.all();
      const mac = Object.values(macList)[0];
      const ua = new UAParser(context.req.headers['user-agent']);
      const browserName = ua.getBrowser().name;
      const userUniqueId = mac.mac + mac.ipv4 + browserName;

      const cookies = new Cookies(context.req, context.res);

      try {
        const me: User = await UserModel.findOne({}, {}, { sort: { _id: -1 } });
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
      } catch (err) {
        throw err;
      }
      return true;
    }
  }
};
