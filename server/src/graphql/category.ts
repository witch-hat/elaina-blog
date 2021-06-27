import { ApolloError, gql, UserInputError, ValidationError } from 'apollo-server';

import { CategoryModel, Category } from '../model/category';
import { CommentModel } from '../model/comment';
import { Post, PostModel } from '../model/post';
import { ContextType } from '../types/context';

export const categoryTypeDef = gql`
  type CategoryWithDetails {
    _id: Int!
    title: String!
    description: String!
    previewImage: String!
    postCount: Int
    recentCreatedAt: DateTime
    order: Int!
  }

  type AddResponse {
    isSuccess: Boolean
    _id: Int
  }

  extend type Query {
    categories: [Category]
    categoriesWithDetails: [CategoryWithDetails]
    findCategoryById(id: Int!): Category
  }

  extend type Mutation {
    addCategory(title: String!, description: String!, previewImage: String!): AddResponse
    updateCategory(id: Int, title: String, description: String): Void
    deleteCategory(index: Int!): Void
    orderCategory(ids: [Int]): Void
  }
`;

export const categoryResolver = {
  Query: {
    async categoriesWithDetails() {
      try {
        const categories = await CategoryModel.find({}, {}, { sort: { order: 1 } });
        const posts = await PostModel.find();

        const countMap: Map<number, number> = new Map<number, number>();
        const createdMap: Map<number, Date | null> = new Map<number, Date | null>();

        // initialize countMap, createdMap
        categories.map((category: Category) => {
          countMap.set(category._id, 0);
          createdMap.set(category._id, null);
        });

        posts.map((post: Post) => {
          if (countMap.has(post.categoryId)) {
            // @ts-ignore
            countMap.set(post.categoryId, countMap.get(post.categoryId) + 1);
          }
          if (createdMap.has(post.categoryId)) {
            createdMap.set(post.categoryId, post.createdAt);
          }
        });

        const result = categories.map((category: Category) => {
          const postCount = countMap.get(category._id);
          const recentCreatedAt = createdMap.get(category._id);
          return {
            _id: category._id,
            title: category.title,
            description: category.description,
            previewImage: category.previewImage,
            postCount,
            recentCreatedAt,
            order: category.order
          };
        });

        return result;
      } catch (err) {
        throw err;
      }
    },

    async findCategoryById(_: any, args: { id: number }, context: ContextType) {
      try {
        const category = CategoryModel.findById(args.id);
        return category;
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    async addCategory(_: any, args: { title: string; description: string; previewImage: string }, context: ContextType) {
      try {
        const categoryList: Category[] = await CategoryModel.find();

        if (!args.title || !args.description) {
          throw new UserInputError('카테고리 제목 또는 소개를 입력해주세요.');
        } else if (categoryList.filter((category) => category.title.toLowerCase() === args.title.toLowerCase()).length) {
          throw new ValidationError('이미 존재하는 제목입니다.');
        }

        const newId = (categoryList[categoryList.length - 1]._id += 1);
        const order = categoryList.length;

        CategoryModel.create({
          _id: newId,
          title: args.title,
          description: args.description,
          previewImage: args.previewImage,
          order
        });

        return { isSuccess: true, _id: newId };
      } catch (err) {
        throw err;
      }
    },

    async updateCategory(_: any, args: { id: number; title: string; description: string }, context: ContextType) {
      try {
        if (!args.title || !args.description) {
          throw new UserInputError('카테고리 제목 또는 소개를 입력해주세요.');
        }

        const categoryList: Category[] = await CategoryModel.find();
        if (categoryList.find((category) => category._id !== args.id && category.title === args.title))
          throw new ValidationError('이미 존재하는 제목입니다.');

        await CategoryModel.updateOne(
          {
            _id: args.id
          },
          {
            title: args.title,
            description: args.description
          }
        );

        return null;
      } catch (err) {
        throw err;
      }
    },

    async deleteCategory(_: any, args: { index: number }, context: ContextType) {
      try {
        if (args.index === undefined) {
          throw new ValidationError('잘못된 index값 입니다.');
        }

        const deletedCategory: Category = await CategoryModel.findOne({ order: args.index });

        if (deletedCategory._id === 0) {
          throw new ValidationError('기본 카테고리는 삭제할 수 없습니다.');
        }

        await CategoryModel.deleteOne({ order: args.index });

        // move posts to default category
        const posts: Post[] = await PostModel.find({ categoryId: deletedCategory._id });
        posts.forEach(async (post) => {
          await PostModel.findByIdAndUpdate(post._id, { categoryId: 0 });
        });
        const categories: Category[] = await CategoryModel.find();
        categories.forEach(async (category) => {
          if (category.order > args.index) {
            await CategoryModel.findByIdAndUpdate(category._id, { order: category.order - 1 });
          }
        });

        return null;
      } catch (err) {
        throw err;
      }
    },

    async orderCategory(_: any, args: { ids: number[] }, context: ContextType) {
      try {
        for (let i = 0; i <= CategoryModel.length; i++) {
          const currentId = args.ids[i];
          const newOrder = args.ids.indexOf(currentId);
          await CategoryModel.findByIdAndUpdate(currentId, { order: newOrder });
        }
        return null;
      } catch (err) {
        throw err;
      }
    }
  }
};
