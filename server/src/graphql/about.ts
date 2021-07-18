import { gql } from 'apollo-server';

import { About, AboutModel } from '../model/about';
import { ContextType } from '../types/context';

export const aboutTypeDef = gql`
  type About {
    updatedAt: DateTime
    article: String
  }

  extend type Query {
    about: About
  }

  extend type Mutation {
    updateAbout(article: String): About
  }
`;

export const aboutResolver = {
  Query: {
    async about() {
      try {
        const about = await AboutModel.findById(1);
        return about;
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    async updateAbout(_: any, args: { article: string }) {
      try {
        const about: About | null = await AboutModel.findById(1);

        if (!about) {
          const newAbout = await AboutModel.create({ _id: 1, article: args.article, updatedAt: new Date() });
          return newAbout;
        }

        about.article = args.article;
        about.updatedAt = new Date();
        await about.save();

        return about;
      } catch (err) {
        throw err;
      }
    }
  }
};
