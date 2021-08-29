import { ApolloError, gql, UserInputError } from 'apollo-server';
import removeMd from 'remove-markdown';

import { CategoryModel } from '../model/category';
import { TempModel, Temp } from '../model/temp';

export const tempTypeDef = gql`
  type TempPost {
    categoryId: Int!
    title: String!
    article: String!
    savedAt: DateTime!
  }

  extend type Query {
    tempPosts(page: Int!): [TempPost]
  }

  extend type Mutation {
    saveTempPost(id: Int!, category: String!, title: String!, article: String): MutationResponse
    deleteTempPost(id: Int!): MutationResponse
  }
`;

export const tempResolver = {
  Query: {
    async tempPosts(_: any, args: { page: number }) {
      try {
        const posts: Temp[] = await TempModel.find({}, {}, { sort: { _id: -1 }, skip: (args.page - 1) * 10, limit: 10 });
        return posts;
      } catch (err) {
        throw err;
      }
    }
  },
  Mutation: {
    async saveTempPost(_: any, args: { id: number; category: string; title: string; article: string }) {
      try {
        const [post, category] = await Promise.all([TempModel.findById(args.id), CategoryModel.findOne({ title: args.category })]);

        if (!category) return { isSuccess: false };

        if (post) {
          post.categoryId = category._id;
          post.title = args.title;
          post.article = args.article;
          post.savedAt = new Date();
          await post.save();

          return { isSuccess: true };
        }

        await TempModel.create({
          _id: args.id,
          title: args.title,
          categoryId: category.id,
          article: args.article,
          savedAt: new Date()
        });

        return { isSuccess: true };
      } catch (err) {
        throw err;
      }
    },
    async deleteTempPost(_: any, args: { id: number }) {
      try {
        const deletedPost = await TempModel.findByIdAndDelete(args.id);

        if (deletedPost) {
          return { isSuccess: true };
        }

        return { isSuccess: false };
      } catch (err) {
        throw err;
      }
    }
  }
};
