import { gql, AuthenticationError, Request } from 'apollo-server';
import express from 'express';
import { User, UserModel } from '../model/user';
import { comparePassword, getToken, verifyToken } from '../util/auth';
import { ContextType } from '../types/context';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { config } from '../util/config';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import Cookies from 'cookies';

const saltRounds = 10;

export const userTypeDef = gql`
  type User {
    _id: ID
    emailId: String
    password: String
  }

  type AuthResponse {
    isAuth: Boolean
  }

  type Auth {
    deviceList: [String]
    refreshToken: String
    id: String
  }

  type LoginResponse {
    auth: Auth
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

const FIVE_MINUTE = 10;
const MONTH = 1000 * 60 * 60 * 24 * 30;

export const userResolver = {
  Query: {
    async me() {
      try {
        const user = await User.find();
        return user[user.length - 1];
      } catch (err) {
        console.log(err);
        throw err;
      }
    },

    async findMeById(id: string) {
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        throw err;
      }
    },

    async isAuth(_: any, args: any, context: ContextType) {
      const me = await User.findOne({}, {}, { sort: { _id: -1 } });
      const cookies = new Cookies(context.req, context.res);
      const accessToken = cookies.get('a_access');
      const refreshToken = cookies.get('a_refresh');
      console.log('a ', accessToken);
      console.log('r ', refreshToken);

      if (!accessToken || !refreshToken) {
        console.log('need to re login: no tokens');
      } else {
        console.log('has tokens');

        let payload: any = null;

        try {
          jwt.verify(accessToken, config.secret);
          return { isAuth: true };
        } catch (err) {
          // refresh tokens
          if (err instanceof TokenExpiredError) {
            try {
              const isMatch = await bcrypt.compare(me.auth.refreshToken, refreshToken);
              if (isMatch) {
                console.log('refresh');
                // re-generate access, refresh token
                const id = uuidv4();
                me.auth.id = id;

                const payload = {
                  refreshTokenId: id
                };

                const accessToken = getToken(payload, FIVE_MINUTE);
                const refreshToken = getToken(payload, MONTH);

                await bcrypt.hash(refreshToken, saltRounds).then((hashedRefreshToken) => {
                  cookies.set('a_refresh', hashedRefreshToken, {
                    httpOnly: true,
                    secure: false
                  });
                });

                cookies.set('a_access', accessToken, {
                  httpOnly: true,
                  secure: false
                });

                me.auth.refreshToken = refreshToken;
                me.save();

                return { isAuth: true };
              } else {
                console.log('refresh token malformed');
              }
            } catch (err) {
              console.log('refresh error', err);
            }
          } else {
            // malformed error is prior than expired error
            console.log('access malformed');
          }
        }
      }

      return { isAuth: false };
    }
  },
  Mutation: {
    async updatePassword(_: any, args: any) {
      try {
        const result = await User.create({
          emailId: args.emailId,
          password: args.password
        });
        return result;
      } catch (err) {
        throw err;
      }
    },

    async login(_: any, args: any, context: ContextType) {
      console.log(context.req.headers.cookie, context.req.cookies);
      const cookies = new Cookies(context.req, context.res);
      try {
        const me = await User.findOne({}, {}, { sort: { _id: -1 } });
        console.log('me', me);

        if (args.emailId === me.emailId) {
          const isMatch = await comparePassword(args.password, me.password);

          if (isMatch) {
            const id = uuidv4();
            me.auth.id = id;

            const payload = {
              refreshTokenId: id
            };

            const accessToken = getToken(payload, FIVE_MINUTE);
            const refreshToken = getToken(payload, MONTH);

            await bcrypt.hash(refreshToken, saltRounds).then((hashedRefreshToken) => {
              cookies.set('a_refresh', hashedRefreshToken, {
                httpOnly: true,
                secure: false
              });
            });

            cookies.set('a_access', accessToken, {
              httpOnly: true,
              secure: false
            });

            me.auth.refreshToken = refreshToken;
            me.save();

            console.log('login', cookies.get('a_refresh'));
            console.log('login', cookies.get('a_access'));

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

    async refreshUserToken(_: any, args: any, context: ContextType) {
      await getConnection().getRepository(User).increment({ _id: args.userId }, 'tokenVersion', 1);

      return true;
    },

    logout(_: any, args: any, context: ContextType) {
      const cookies = new Cookies(context.req, context.res);
      console.log('a ', cookies.get('a_access'));
      console.log('r ', cookies.get('a_refresh'));
      try {
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
