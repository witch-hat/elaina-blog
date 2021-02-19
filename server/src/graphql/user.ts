import { gql, AuthenticationError, Request } from 'apollo-server';
import express from 'express';
import { User, UserModel } from '../model/user';
import { comparePassword, getToken } from '../util/auth';
import { ContextType } from '../types/context';
import jwt from 'jsonwebtoken';
import { config } from '../util/config';
import { getConnection } from 'typeorm';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const userTypeDef = gql`
  type User {
    _id: ID
    emailId: String
    password: String
  }

  type LoginResponse {
    accessToken: String
    user: User
  }

  type LogoutResponse {
    logout: Boolean
  }

  extend type Query {
    me: User
    findMeById: User
  }

  extend type Mutation {
    updatePassword(emailId: String, password: String): User

    login(emailId: String!, password: String!): LoginResponse

    logout(emailId: String!): LogoutResponse

    refreshUserToken(userId: ID!): User
  }
`;

const FIVE_MINUTE = 60 * 5;
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
      try {
        const me = await User.findOne({}, {}, { sort: { _id: -1 } });
        console.log('me', me);

        if (args.emailId === me.emailId) {
          const isMatch = await comparePassword(args.password, me.password);

          const payload = {
            userId: me._id
          };

          if (isMatch) {
            const accessToken = getToken(payload, FIVE_MINUTE);
            const refreshToken = getToken(payload, MONTH);

            context.cookies.set('a_refresh', refreshToken, {
              httpOnly: true,
              // 14 days
              maxAge: 1000 * 60 * 60 * 24 * 14
            });
            context.cookies.set('a_access', accessToken, {
              httpOnly: true,
              // 5 minutes
              maxAge: 1000 * 60 * 5
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

    async refreshUserToken(_: any, args: any, context: ContextType) {
      await getConnection().getRepository(User).increment({ _id: args.userId }, 'tokenVersion', 1);

      return true;
    },

    logout(_: any, args: any, context: ContextType) {
      try {
        context.cookies.set('a_refresh', '', {
          expires: new Date(0)
        });
        context.cookies.set('a_access', '', {
          expires: new Date(0)
        });
      } catch (err) {
        throw err;
      }
      return true;
    }
  }
};
