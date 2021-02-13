import { gql, AuthenticationError, Request } from 'apollo-server';
import express from 'express';
import { User, UserModel } from '../model/user';
import { comparePassword, getToken } from '../util/auth';
import { ContextType } from '../types/context';

export const userTypeDef = gql`
  type User {
    emailId: String
    password: String
    token: String
  }

  extend type Query {
    me: User
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
        const user = await User.find();
        const me: UserModel = user[user.length - 1];

        if (args.emailId === me.emailId) {
          const isMatch = await comparePassword(args.password, me.password);

          if (isMatch) {
            const token = getToken(me);
            me.token = token;

            context.cookies.set('admin', token, {
              httpOnly: true
            });

            return me;
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
