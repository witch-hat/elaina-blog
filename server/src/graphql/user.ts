import { gql } from 'apollo-server';
import { User } from '../model/user';

export const userTypeDef = gql`
  type User {
    id: String
    pw: String
  }

  type Query {
    user: User
  }
`;

export const userResolver = {
  Query: {
    user: () => User
  }
};
