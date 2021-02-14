import merge from 'lodash/merge';
import { gql } from 'apollo-server';
import { GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLUpload } from 'graphql-upload';

import { profileTypeDef, profileResolver } from './profile';
import { userTypeDef, userResolver } from './user';
import { categoryTypeDef, categoryResolver } from './category';
import { postTypeDef, postResolver } from './post';
import { commentTypeDef, commentResolver } from './comment';
import { fileResolver, fileTypeDef } from './file';

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

const rootTypeDef = gql`
  scalar DateTime
  scalar Upload

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  DateTime: dateScalar,
  Upload: GraphQLUpload
};

export const schema = makeExecutableSchema({
  typeDefs: [rootTypeDef, profileTypeDef, userTypeDef, categoryTypeDef, postTypeDef, commentTypeDef, fileTypeDef],
  resolvers: merge(resolvers, profileResolver, userResolver, categoryResolver, postResolver, commentResolver, fileResolver)
});
