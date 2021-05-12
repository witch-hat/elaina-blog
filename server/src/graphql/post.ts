import { ApolloError, gql, UserInputError } from 'apollo-server';

import { PostModel, Post } from '../model/post';
import { ContextType } from '../types/context';
import { CategoryModel, Category } from '../model/category';
import { CommentModel } from '../model/comment';
import { ProfileModel } from '../model/profile';

export const postTypeDef = gql`
  type Post {
    _id: Int!
    title: String!
    createdAt: DateTime
    article: String!
    categoryId: Int!
  }

  type PostCategory {
    post: [Post]
    category: Category
  }

  type DeleteResponse {
    isSuccess: Boolean
    categoryId: Int
  }

  type SearchResult {
    post: Post
    content: String
  }

  type SearchResponse {
    result: [SearchResult]
  }

  extend type Query {
    posts: [Post]
    lastPost: Post!
    findPostByUrl(requestUrl: String!): Post!
    findSameCategoryPosts(categoryId: Int!): PostCategory
    getLatestPostsEachCategory: [Post]
    search(keyword: String!): SearchResponse
  }

  extend type Mutation {
    writePost(title: String!, createdAt: DateTime, article: String!, category: String!): Post
    deletePost(id: Int!): DeleteResponse
    editPost(id: Int!, title: String!, article: String!, category: String!): Void
  }
`;

export const postResolver = {
  Query: {
    async posts() {
      try {
        const postList: Post[] = await PostModel.find({}, {}, { sort: { _id: -1 } });
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
        const findedPost = await PostModel.findOne({ _id: parsedUrl });
        return findedPost;
      } catch (err) {
        throw err;
      }
    },

    async findSameCategoryPosts(_: any, args: { categoryId: number }, context: ContextType) {
      try {
        const sameCategoryPosts: Post[] = await PostModel.find({ categoryId: args.categoryId });
        const categoryFindResult = await CategoryModel.findById(args.categoryId);

        return {
          post: sameCategoryPosts.reverse(),
          category: categoryFindResult
        };
      } catch (err) {
        throw err;
      }
    },

    async getLatestPostsEachCategory() {
      const categories = await CategoryModel.find({}, {}, { sort: { order: 1 } });

      const posts: Post[] = categories.map(async (category: Category) => {
        const post: Post = await PostModel.findOne({ categoryId: category._id }, {}, { sort: { _id: -1 } });
        return post;
      });

      return posts;
    },

    async search(_: any, args: { keyword: string }, context: ContextType) {
      try {
        if (args.keyword.length < 2 || args.keyword.length > 10) {
          throw new Error('2~10자 이내로 입력해 주세요');
        }

        const posts: Post[] = await PostModel.find({}, {}, { sort: { _id: -1 } });
        const keyword = RegExp(args.keyword, 'i');

        const searchResult: { post: Post; content: string }[] = [];

        posts.forEach((post) => {
          // filter images,  bar ...etc
          const ignore = new RegExp(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/);

          if (post.title.match(keyword)) {
            const content = post.article
              .split('\n')
              .filter((sentence) => {
                return !sentence.trim().match(ignore);
              })
              .join(' ');

            return searchResult.push({ post, content });
          }

          if (post.article.match(keyword)) {
            const content = post.article
              .split('\n')
              .filter((sentence) => {
                return !sentence.trim().match(ignore);
              })
              .join(' ');

            return searchResult.push({ post, content });
          }
        });

        return { result: searchResult };
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    async writePost(_: any, args: { title: string; createdAt: Date; article: string; category: string }, context: ContextType) {
      try {
        if (!args.article || args.title.length < 2 || !args.category) {
          throw new UserInputError('카테고리, 제목 또는 본문을 입력해주세요');
        }

        const lastPost: Post = await PostModel.findOne({}, {}, { sort: { _id: -1 } });
        const _id = lastPost._id + 1;

        const category = await CategoryModel.findOne({ title: args.category });
        const categoryId = category._id;

        CommentModel.create({ _id });

        const result = await PostModel.create({ _id, title: args.title, createdAt: args.createdAt, categoryId, article: args.article });
        return result;
      } catch (err) {
        throw err;
      }
    },

    async deletePost(_: any, args: { id: number }, context: ContextType) {
      try {
        const deletedPost = await PostModel.findByIdAndDelete(args.id);
        await CommentModel.findByIdAndDelete(args.id);
        return { isSuccess: true, categoryId: deletedPost.categoryId };
      } catch (err) {
        throw err;
      }
    },

    async editPost(_: any, args: { id: number; title: string; article: string; category: string }, context: ContextType) {
      try {
        if (!args.article || args.title.length < 2 || !args.category) {
          throw new UserInputError('카테고리, 제목 또는 본문을 입력해주세요');
        }

        const editPost: Post = await PostModel.findById(args.id);
        editPost.title = args.title;
        editPost.article = args.article;

        const category = await CategoryModel.findOne({ title: args.category });
        const categoryId = category._id;

        editPost.categoryId = categoryId;

        editPost.save();

        return null;
      } catch (err) {
        throw err;
      }
    }
  }
};
