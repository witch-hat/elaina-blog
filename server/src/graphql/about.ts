import { gql } from 'apollo-server';
import { About, AboutModel } from '../model/about';

export const aboutTypeDef = gql`
  type About {
    updatedAt: DateTime
    article: String
  }

  extend type Query {
    about: About
  }
`;

export const aboutResolver = {
  Query: {
    async about() {
      try {
        const aboutList = await AboutModel.find();
        return aboutList[0];
      } catch (err) {
        throw err;
      }
    }
  }
};
