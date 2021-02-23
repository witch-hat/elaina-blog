import { gql } from 'apollo-server';
import { PostModel } from '../model/post';

export const postTypeDef = gql`
  type Post {
    _id: Int!
    author: String!
    postUrl: String!
    title: String!
    createdAt: DateTime
    article: String!
    category: String!
  }

  extend type Query {
    posts: [Post]
  }
`;

export const postResolver = {
  Query: {
    async posts() {
      try {
        const postList = await PostModel.find();
        return postList;
      } catch (err) {
        throw err;
      }
    }
  }
};
