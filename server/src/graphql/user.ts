import { gql, AuthenticationError, Request } from 'apollo-server';
import express from 'express';
import { User, UserModel } from '../model/user';
import { comparePassword, getToken } from '../util/auth';
import { ContextType } from '../types/context';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

export const userTypeDef = gql`
  type User {
    emailId: String
    password: String
  }

  extend type Query {
    me: User
    findMeById: User
  }

  extend type Mutation {
    updatePassword(emailId: String, password: String): User

    login(emailId: String!, password: String!): User

    logout(emailId: String): User
  }
`;

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
        // get lastest one
        const me = await User.findOne({}, {}, { sort: { _id: -1 } });
        console.log(me);

        if (args.emailId === me.emailId) {
          const isMatch = await comparePassword(args.password, me.password);

          const payload = {
            userId: me._id
          };

          if (isMatch) {
            const HOUR = 60 * 60;
            const MONTH = 1000 * 60 * 60 * 24 * 30;
            const accessToken = getToken(payload, HOUR);
            const refreshToken = uuidv4();
            const salt = await bcrypt.genSalt(10);
            const refreshTokenHash = await bcrypt.hash(refreshToken, salt);
            // mulitple 1000 for eqaulizing date time with token and Date()
            const refreshTokenExpire = new Date(Date.now() + MONTH);

            me.refreshToken = {
              hash: refreshTokenHash,
              expire: refreshTokenExpire
            };

            me.save();

            console.log(refreshToken);

            context.cookies.set('admin_r', refreshToken, {
              httpOnly: true,
              maxAge: MONTH
            });

            return { userId: me._id, accessToken };
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

    logout(_: any, args: any, context: ContextType) {
      try {
        return context.cookies.set('admin', '', {
          expires: new Date(0)
        });
      } catch (err) {
        throw err;
      }
    }
  }
};
