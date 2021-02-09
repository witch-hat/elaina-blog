import { gql } from 'apollo-server';
import { Category } from '../model/category';

export const categoryTypeDef = gql`
  type Category {
    _id: ID!
    title: String!
    description: String!
    previewImage: String!
  }
`;

export const categoryResolver = {
  Query: {
    async category() {
      try {
        const categories = await Category.find();
        return categories;
      } catch (err) {
        throw err;
      }
    }
  }
};
