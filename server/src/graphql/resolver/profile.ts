import { Profile } from '../../model/profile';

export const profileResolver = {
  Query: {
    async profile(_: any, args: any) {
      try {
        const profile = await Profile.find();
        return profile;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  },
  Profile: {
    image(_: any, args: any) {
      return _.image;
    },
    name(_: any, args: any) {
      return _.name;
    },
    introduce(_: any, args: any) {
      return _.introduce;
    },
    link(_: any, args: any) {
      return _.link;
    },
    company(_: any, args: any) {
      return _.company;
    },
    location(_: any, args: any) {
      return _.location;
    },
    email(_: any, args: any) {
      return _.email;
    }
  }
};
