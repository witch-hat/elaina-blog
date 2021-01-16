import merge from 'lodash/merge';
import { makeExecutableSchema } from 'apollo-server';
import { profileTypeDef, profileResolver } from './profile';
import { userTypeDef, userResolver } from './user';

export const schema = makeExecutableSchema({
  typeDefs: [profileTypeDef],
  resolvers: merge(profileResolver)
});
