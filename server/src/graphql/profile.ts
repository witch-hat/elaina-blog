import { gql } from 'apollo-server';
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
        console.log(err);
        throw err;
      }
    }
  },
  Mutation: {
    async updateProfile(_: any, args: any, context: ContextType) {
      try {
        const result = await ProfileModel.findByIdAndUpdate(
          args.id,
          {
            ...args
          },
          { new: true }
        );
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
