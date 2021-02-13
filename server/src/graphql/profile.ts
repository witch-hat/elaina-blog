import { gql } from 'apollo-server';
import { Profile } from '../model/profile';
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
    async updateProfile(_: any, args: any, context: ContextType) {
      // user verify
      if (!context.user.login) {
        return null;
      }

      try {
        const result = await Profile.findByIdAndUpdate(args.id, {
          image: args.image,
          introduce: args.introduce,
          link: args.link,
          company: args.company,
          location: args.location,
          email: args.email
        });
        console.log('profile update success!');
        return result;
      } catch (err) {
        throw err;
      }
    }
  }
};
