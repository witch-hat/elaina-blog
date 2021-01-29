import merge from 'lodash/merge';
import { GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { makeExecutableSchema, gql } from 'apollo-server';

import { profileTypeDef, profileResolver } from './profile';
import { userTypeDef, userResolver } from './user';
import { categoryTypeDef, categoryResolver } from './category';

function serialize(value: Date) {
  return value.toString();
}

function parseValue(value: any) {
  console.log(value);
  return new Date(value);
}

function parseLiteral(ast: ValueNode) {
  console.log(ast);
  if (ast.kind === Kind.STRING) {
    return parseValue(ast.value);
  }
  return null;
}

const dateScalar = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date custom scalar type',
  serialize,
  parseValue,
  parseLiteral
});

const Query = gql`
  scalar DateTime

  type Query {
    profile: Profile
    me: User
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

    login(emailId: String!, password: String!): User
  }
`;

const resolvers = {
  DateTime: dateScalar
};

export const schema = makeExecutableSchema({
  typeDefs: [Query, profileTypeDef, userTypeDef, categoryTypeDef],
  resolvers: merge(resolvers, profileResolver, userResolver, categoryResolver)
});
