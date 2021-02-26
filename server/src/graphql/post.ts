import { gql } from 'apollo-server';
import { PostModel, Post } from '../model/post';
import { ContextType } from '../types/context';
import { CategoryModel, Category } from '../model/category';
import { UserModel } from '../model/user';
import { ProfileModel } from '../model/profile';

export const postTypeDef = gql`
  type Post {
    _id: Int!
    author: String!
    title: String!
    createdAt: DateTime
    article: String!
    categoryId: Int!
  }

  type PostCategory {
    post: [Post]
    category: Category
  }

  extend type Query {
    posts: [Post]
    lastPost: Post!
    findPostByUrl(requestUrl: String!): Post!
    findSameCategoryPosts(categoryId: Int!): PostCategory
    getLatestPostsEachCategory: [Post]
  }

  # extend type Mutation {
  #   writePost(title: String!, createdAt: DateTime, article: String!, category: String!): Post
  # }
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
        const parsedUrl = Number.parseInt(args.requestUrl);
        const findedPost = PostModel.findOne({ _id: parsedUrl });
        return findedPost;
      } catch (err) {
        throw err;
      }
    },

    async findSameCategoryPosts(_: any, args: { categoryId: number }, context: ContextType) {
      try {
        const sameCategoryPosts = PostModel.find({ categoryId: args.categoryId });
        const categoryFindResult = CategoryModel.findById(args.categoryId);

        return {
          post: sameCategoryPosts,
          category: categoryFindResult
        };
      } catch (err) {
        throw err;
      }
    },

    async getLatestPostsEachCategory() {
      const categories = await CategoryModel.find();

      const posts: Post[] = categories.map(async (category: Category) => {
        const post: Post = await PostModel.findOne({ categoryId: category._id }, {}, { sort: { _id: -1 } });
        return post;
      });

      return posts;
    }
  }

  // Mutation: {
  //   async writePost(_: any, args: { title: string; createdAt: Date; article: string; category: string }, context: ContextType) {
  //     try {
  //       const lastPost = await PostModel.findOne({}, {}, { sort: { _id: -1 } });
  //       const _id = lastPost._id + 1;

  //       const category = await CategoryModel.findOne({ title: args.category });
  //       const categoryId = category._id;

  //       const profile = await ProfileModel.findOne();
  //       const author = profile.name;

  //       const result = PostModel.create({ _id, title: args.title, createdAt: args.createdAt, author });
  //     } catch (err) {}
  //   }
  // }
};
