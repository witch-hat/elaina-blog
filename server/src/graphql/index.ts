import merge from 'lodash/merge';
import { gql } from 'apollo-server';
import { GraphQLScalarType, Kind, ValueNode } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLUpload } from 'graphql-upload';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';

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
  serialize(value: Date) {
    return value.toString();
  },
  parseValue(value: any) {
    return new Date(value);
  },
  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  }
});

const voidScalar = new GraphQLScalarType({
  name: 'Void',
  description: 'return null',
  serialize() {
    return null;
  },
  parseValue() {
    return null;
  },
  parseLiteral() {
    return null;
  }
});

const rootTypeDef = gql`
  scalar DateTime
  scalar Upload
  scalar Void

  type MutationResponse {
    isSuccess: Boolean!
  }

  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

const resolvers = {
  DateTime: dateScalar,
  Void: voidScalar,
  Upload: GraphQLUpload
};

const { mergedTypeDefs, mergedResolvers } = loadAllFiles();

export const schema = makeExecutableSchema({
  typeDefs: [rootTypeDef, mergedTypeDefs],
  resolvers: merge(resolvers, { ...mergedResolvers })
});
