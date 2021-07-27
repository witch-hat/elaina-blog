import { gql, ApolloError, UserInputError } from 'apollo-server';

import { ProfileModel, Profile } from '../model/profile';
import { ContextType } from '../types/context';

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
      _id: String
      image: String
      name: String
      introduce: String
      link: String
      company: String
      location: String
      email: String
    ): Profile
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
    async updateProfile(_: any, args: Profile, context: ContextType) {
      try {
        const updatedProfile = await ProfileModel.findByIdAndUpdate(
          args._id,
          {
            image: args.image,
            name: args.name,
            introduce: args.introduce,
            link: args.link,
            company: args.company,
            location: args.location,
            email: args.email
          },
          { new: true, upsert: true }
        );

        return updatedProfile;
      } catch (err) {
        throw err;
      }
    }
  }
};
