import { gql } from 'apollo-server';
import { PostModel } from '../model/post';
import { ContextType } from '../types/context';

export const postTypeDef = gql`
  type Post {
    _id: Int!
    author: String!
    postUrl: String!
    title: String!
    createdAt: DateTime
    article: String!
    category: String!
    commentId: String
    categoryId: String
  }

  extend type Query {
    posts: [Post]
    lastPost: Post!
    findPostByUrl(requestUrl: String!): Post!
    findSameCategoryPosts(categoryId: Int!): [Post]
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
    },

    async lastPost() {
      try {
        const lastPost = await PostModel.findOne({}, {}, { sort: { _id: -1 } });
        return lastPost;
      } catch (err) {
        throw err;
      }
    },

    async findPostByUrl(_: any, args: { requestUrl: string }, context: ContextType) {
      try {
        const findedPost = PostModel.findOne({ postUrl: args.requestUrl });
        return findedPost;
      } catch (err) {
        throw err;
      }
    },

    async findSameCategoryPosts(_: any, args: { categoryId: number }, context: ContextType) {
      try {
        const sameCategoryPosts = PostModel.find({ categoryId: args.categoryId });
        return sameCategoryPosts;
      } catch (err) {
        throw err;
      }
    }
  }
};
