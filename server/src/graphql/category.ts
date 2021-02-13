import { gql } from 'apollo-server';
import { Category } from '../model/category';

export const categoryTypeDef = gql`
  type Category {
    _id: ID!
    title: String!
    description: String!
    previewImage: String!
  }

  extend type Query {
    categories: [Category]
  }
`;

export const categoryResolver = {
  Query: {
    async categories() {
      try {
        const categoryList = await Category.find();
        return categoryList;
      } catch (err) {
        throw err;
      }
    }
  }
};
