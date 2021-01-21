import { gql } from 'apollo-server';
import { Profile } from '../model/profile';

export const profileTypeDef = gql`
  type Query {
    profile: Profile!
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
    ): Profile!
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
    async updateProfile(_: any, args: any) {
      try {
        console.log(args);
        const result = await Profile.findByIdAndUpdate(args.id, {
          image: args.image,
          name: args.name,
          introduce: args.introduce,
          link: args.link,
          company: args.company,
          location: args.location,
          email: args.email
        });
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
