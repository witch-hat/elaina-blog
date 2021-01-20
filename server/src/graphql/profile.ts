import { gql } from 'apollo-server';
import { Profile } from '../model/profile';

export const profileTypeDef = gql`
  type Query {
    profile: Profile!
  }

  type Mutation {
    updateProfile(image: String, name: String, introduce: String, link: String, company: String, location: String, email: String): Profile!
  }

  type Profile {
    _id: ID
    image: String
    name: String
    introduce: String
    link: String
    company: String
    location: String
    email: String
  }
`;

export const profileResolver = {
  Query: {
    async profile() {
      try {
        const profile = await Profile.findOne();
        return profile;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  Mutation: {
    async updateProfile(args: any) {
      try {
        const result = await Profile.findByIdAndUpdate('600308975f10bd62bfa2d59d', {
          ...args
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
