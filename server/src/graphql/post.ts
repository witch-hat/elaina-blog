import { ApolloError, gql, UserInputError } from 'apollo-server';
import removeMd from 'remove-markdown';

import { PostModel, Post } from '../model/post';
import { CategoryModel, Category } from '../model/category';
import { CommentModel } from '../model/comment';

export const postTypeDef = gql`
  type Post {
    _id: Int!
    title: String!
    createdAt: DateTime!
    article: String!
    categoryId: Int!
    likeCount: Int!
    commentCount: Int!
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
    getLatestPosts(page: Int!): [Post]
    findPostById(id: String!): Post
    findSameCategoryPosts(categoryId: Int!): PostCategory
    search(keyword: String!): SearchResponse
  }

  extend type Mutation {
    writePost(title: String!, createdAt: DateTime, article: String!, category: String!): Post
    deletePost(id: Int!): DeleteResponse
    editPost(id: Int!, title: String!, article: String!, category: String!): Void
    editLikeCount(id: Int!, likeCount: Int!): Void
  }
`;

export const postResolver = {
  Query: {
    async getLatestPosts(_: any, args: { page: number }) {
      try {
        const posts = await PostModel.find({}, {}, { sort: { _id: -1 }, skip: (args.page - 1) * 10, limit: 10 });

        const previewPosts: Post[] = posts.map((post) => {
          return {
            _id: post._id,
            title: post.title,
            createdAt: post.createdAt,
            article: removeMd(post.article),
            categoryId: post.categoryId,
            likeCount: post.likeCount,
            commentCount: post.commentCount
          };
        });

        return previewPosts;
      } catch (err) {
        throw err;
      }
    },

    async findPostById(_: any, args: { id: string }) {
      try {
        const parsedUrl = Number.parseInt(args.id);
        const findedPost = await PostModel.findOne({ _id: parsedUrl });
        return findedPost;
      } catch (err) {
        throw err;
      }
    },

    async findSameCategoryPosts(_: any, args: { categoryId: number }) {
      try {
        const [sameCategoryPosts, categoryFindResult] = await Promise.all([
          PostModel.find({ categoryId: args.categoryId }),
          CategoryModel.findById(args.categoryId)
        ]);

        // Remove markdown from article preview
        for (let posts of sameCategoryPosts) {
          posts.article = removeMd(posts.article);
        }

        return {
          post: sameCategoryPosts.reverse(),
          category: categoryFindResult
        };
      } catch (err) {
        throw err;
      }
    },

    async search(_: any, args: { keyword: string }) {
      try {
        if (args.keyword.length < 2 || args.keyword.length > 10) {
          throw new Error('2~10자 이내로 입력해 주세요');
        }

        const posts = await PostModel.find({}, {}, { sort: { _id: -1 } });
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
    async writePost(_: any, args: { title: string; createdAt: Date; article: string; category: string }) {
      try {
        if (!args.title) {
          throw new UserInputError('글의 제목을 1자 이상 써주세요.');
        }
        if (!args.article) {
          throw new UserInputError('글의 본문을 1자 이상 써주세요.');
        }

        const lastPost = await PostModel.findOne({}, {}, { sort: { _id: -1 } });

        if (lastPost) {
          const _id = lastPost._id + 1;

          await CommentModel.create({ _id });

          if (args.category === '') {
            const result = await PostModel.create({
              _id,
              title: args.title,
              createdAt: args.createdAt,
              article: args.article
            });
            return result;
          }

          const category = await CategoryModel.findOne({ title: args.category });
          if (category) {
            const categoryId = category._id;

            const result = await PostModel.create({ _id, title: args.title, createdAt: args.createdAt, categoryId, article: args.article });

            return result;
          } else {
            throw new ApolloError('Cannot find category...');
          }
        } else {
          // if first post

          await CommentModel.create({ _id: 1 });

          if (args.category === '') {
            const result = await PostModel.create({
              _id: 1,
              title: args.title,
              createdAt: args.createdAt,
              article: args.article
            });
            return result;
          }

          const category = await CategoryModel.findOne({ title: args.category });
          if (category) {
            const categoryId = category._id;

            const result = await PostModel.create({
              _id: 1,
              title: args.title,
              createdAt: args.createdAt,
              categoryId,
              article: args.article
            });

            return result;
          } else {
            throw new ApolloError('Cannot find category...');
          }
        }
      } catch (err) {
        throw err;
      }
    },

    async deletePost(_: any, args: { id: number }) {
      try {
        const [deletedPost, deletedComment] = await Promise.all([
          PostModel.findByIdAndDelete(args.id),
          CommentModel.findByIdAndDelete(args.id)
        ]);

        if (deletedPost && deletedComment) {
          return { isSuccess: true, categoryId: deletedPost.categoryId };
        }

        return { isSuccess: false };
      } catch (err) {
        throw err;
      }
    },

    async editPost(_: any, args: { id: number; title: string; article: string; category: string }) {
      try {
        if (!args.article || args.title.length < 2) {
          throw new UserInputError('카테고리, 제목 또는 본문을 입력해주세요');
        }

        const [editPost, category] = await Promise.all([PostModel.findById(args.id), CategoryModel.findOne({ title: args.category })]);
        if (editPost && category) {
          editPost.title = args.title;
          editPost.article = args.article;
          editPost.categoryId = category._id;
          await editPost.save();
        }

        return null;
      } catch (err) {
        throw err;
      }
    },

    async editLikeCount(_: any, args: { id: number; likeCount: number }) {
      try {
        const [editPost] = await Promise.all([PostModel.findById(args.id)]);
        if (editPost) {
          editPost.likeCount = args.likeCount;
          await editPost.save();
        }
      } catch (err) {
        throw err;
      }
    }
  }
};
