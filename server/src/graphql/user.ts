import { gql, AuthenticationError } from 'apollo-server';
import { User, UserModel } from '../model/user';
import { comparePassword, getToken } from '../util/auth';

export const userTypeDef = gql`
  type User {
    emailId: String
    password: String
    token: String
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

    async login(_: any, args: any) {
      try {
        const user = await User.find();
        const me: UserModel = user[user.length - 1];

        if (args.emailId === me.emailId) {
          const isMatch = await comparePassword(args.password, me.password);

          if (isMatch) {
            const token = getToken(me);
            me.token = token;
            return me;
          } else {
            throw new AuthenticationError('wrong password!');
          }
        } else {
          throw new AuthenticationError('wrong emailId!');
        }
      } catch (err) {
        throw err;
      }
    }
  }
};
