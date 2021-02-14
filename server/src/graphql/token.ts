import { gql } from 'apollo-server';
import { Token } from '../model/token';

export const tokenTypeDef = gql`
  type Token {
    hash: String!
    expires: DateTime!
  }

  extend type Query {
    token: Token
  }
`;

export const tokenResolver = {
  Query: {
    async token() {
      try {
        const refreshToken = await Token.findOne();
        return refreshToken;
      } catch (err) {
        throw err;
      }
    }
  }
};
