import merge from 'lodash/merge';
import { makeExecutableSchema, gql } from 'apollo-server';
import { profileTypeDef, profileResolver } from './profile';
import { userTypeDef, userResolver } from './user';

const Query = gql`
  type Query {
    profile: Profile
    user: [User]
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

export const schema = makeExecutableSchema({
  typeDefs: [Query, profileTypeDef, userTypeDef],
  resolvers: merge(profileResolver, userResolver)
});
