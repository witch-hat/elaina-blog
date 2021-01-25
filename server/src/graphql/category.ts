import { gql } from 'apollo-server';
import { Category } from '../model/category';

export const categoryTypeDef = gql`
  type Comment {
    username: String!
    password: String!
    createdAt: Date!
    comment: String!
    replies: [Comment]
  }

  type Post {
    username: String!
    postUrl: String!
    title: String!
    createdAt: Date!
    article: String!
    comments: [Comment]
  }

  type Category {
    _id: ID!
    name: String!
    description: String!
    previewImage: String!
    posts: [Post]
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
