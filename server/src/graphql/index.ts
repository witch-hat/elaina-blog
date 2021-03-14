import merge from 'lodash/merge';
import { gql } from 'apollo-server';
import { GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLUpload } from 'graphql-upload';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

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

function loadAllFiles() {
  const schemas = loadFilesSync(__dirname, { extensions: ['ts'], ignoreIndex: true });

  const typeDefs: any = schemas.map((schema) => Object.values(schema)[0]);
  const resolvers: any = schemas.map((schema) => Object.values(schema)[1]);

  const mergedTypeDefs = mergeTypeDefs(typeDefs);
  const mergedResolvers = mergeResolvers(resolvers);

  return { mergedTypeDefs, mergedResolvers };
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

const { mergedTypeDefs, mergedResolvers } = loadAllFiles();

export const schema = makeExecutableSchema({
  typeDefs: [rootTypeDef, mergedTypeDefs],
  resolvers: merge(resolvers, { ...mergedResolvers })
});
