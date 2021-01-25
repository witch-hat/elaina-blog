import merge from 'lodash/merge';
import { GraphQLScalarType, Kind } from 'graphql';
import { makeExecutableSchema, gql } from 'apollo-server';

import { profileTypeDef, profileResolver } from './profile';
import { userTypeDef, userResolver } from './user';
import { categoryTypeDef, categoryResolver } from './category';

const dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime();
  },
  parseValue(value) {
    return new Date(value);
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  }
});

const Query = gql`
  scalar Date

  type Query {
    profile: Profile
    user: [User]
    category: [Category]
  }

  type Mutation {
    updateProfile(
      id: String
      image: String
      name: String
      introduce: String
      link: String
      company: String
      location: String
      email: String
    ): Profile

    updatePassword(emailId: String, password: String): User
  }
`;

const resolvers = {
  Date: dateScalar
};

export const schema = makeExecutableSchema({
  typeDefs: [Query, profileTypeDef, userTypeDef, categoryTypeDef],
  resolvers: merge(resolvers, profileResolver, userResolver, categoryResolver)
});
