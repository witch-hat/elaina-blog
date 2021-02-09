import { gql } from 'apollo-server';
import { Post } from '../model/post';

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
`;

export const postResolver = {
  Query: {
    async post() {
      try {
        const posts = await Post.find();
        return posts;
      } catch (err) {
        throw err;
      }
    }
  }
};
