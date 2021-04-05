import { gql, ApolloError, UserInputError } from 'apollo-server';
import { ProfileModel } from '../model/profile';
import { ContextType } from '../types/context';

// type Query {
//   profile: Profile!
// }

export const profileTypeDef = gql`
  type Profile {
    _id: ID!
    image: String!
    name: String!
    introduce: String!
    link: String!
    company: String!
    location: String!
    email: String!
  }

  extend type Query {
    profile: Profile
  }

  extend type Mutation {
    updateProfile(
      id: String
      image: String
      name: String
      introduce: String
      link: String
      company: String
      location: String
      email: String
    ): MutationResponse
  }
`;

export const profileResolver = {
  Query: {
    async profile() {
      try {
        const profile = await ProfileModel.findOne();
        return profile;
      } catch (err) {
        throw new ApolloError('Server Error: Cannot find profile');
      }
    }
  },
  Mutation: {
    async updateProfile(_: any, args: any, context: ContextType) {
      try {
        await ProfileModel.findByIdAndUpdate(
          args.id,
          {
            ...args
          },
          { new: true }
        );
        return { isSuccess: true };
      } catch (err) {
        throw err;
      }
    }
  }
};
