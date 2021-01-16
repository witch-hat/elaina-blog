import { gql } from 'apollo-server';
import { Profile } from '../model/profile';

export const profileTypeDef = gql`
  type Query {
    profile: [Profile]
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
        const profile = await Profile.find();
        return profile;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};
