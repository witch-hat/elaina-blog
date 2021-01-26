import { gql } from 'apollo-server';
import { Category } from '../model/category';

export const categoryTypeDef = gql`
  type Reply {
    username: String!
    password: String!
    createAt: DateTime
  }

  type Comment {
    username: String!
    password: String!
    createAt: DateTime
    comment: String!
    replies: [Reply]
  }

  type Post {
    author: String!
    postUrl: String!
    title: String!
    createAt: DateTime
    article: String!
    comments: [Comment]
  }

  type Category {
    _id: ID!
    title: String!
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
