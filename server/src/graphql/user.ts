import { gql } from 'apollo-server';
import { User, UserModel } from '../model/user';

export const userTypeDef = gql`
  type User {
    emailId: String
    password: String
  }
`;

export const userResolver = {
  Query: {
    async user() {
      try {
        const user = await User.find();
        return user;
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
    }
  }
};
