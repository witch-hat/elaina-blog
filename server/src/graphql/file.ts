import { ApolloServer, gql } from 'apollo-server-express';
import { ContextType } from '../types/context';

export const fileTypeDef = gql`
  type File {
    name: String!
    mimetype: String!
    encoding: String!
  }
`;

export const fileResolver = {
  // Mutation: {
  //   async uploadFile(_: any, args: any, context: ContextType) {
  //     console.log('HERE');
  //     // user verify
  //     if (!context.user.login) {
  //       return null;
  //     }
  //     console.log('HERE');
  //     return { '1': 'a' };
  //   }
  // }
};
