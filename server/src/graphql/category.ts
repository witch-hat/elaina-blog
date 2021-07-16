import { ApolloError, gql, UserInputError, ValidationError } from 'apollo-server';

import { CategoryModel, Category } from '../model/category';
import { CommentModel } from '../model/comment';
import { Post, PostModel } from '../model/post';
import { ContextType } from '../types/context';

export const categoryTypeDef = gql`
  type Category {
    _id: Int!
    title: String!
    order: Int!
  }

  type CategoryWithDetails {
    _id: Int!
    title: String!
    postCount: Int
    recentCreatedAt: DateTime
    order: Int!
  }

  extend type Query {
    categories: [Category]
    categoriesWithDetails: [CategoryWithDetails]
    findCategoryById(id: Int!): Category
  }

  extend type Mutation {
    addCategory(title: String!): Category
    updateCategory(id: Int, title: String): Category
    deleteCategory(index: Int!): MutationResponse
    orderCategory(ids: [Int]): Void
  }
`;

export const categoryResolver = {
  Query: {
    async categoriesWithDetails() {
      try {
        const [categories, posts]: [Category[], Post[]] = await Promise.all([
          CategoryModel.find({}, {}, { sort: { order: 1 } }),
          PostModel.find()
        ]);

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

    async findCategoryById(_: any, args: { id: number }) {
      try {
        const category: Category | null = CategoryModel.findById(args.id);
        return category;
      } catch (err) {
        throw err;
      }
    }
  },

  Mutation: {
    async addCategory(_: any, args: { title: string }) {
      try {
        const categories: Category[] = await CategoryModel.find();

        if (!args.title) {
          throw new UserInputError('카테고리 제목을 입력해주세요.');
        }

        const isDuplicated = categories.filter((category) => category.title.toLowerCase() === args.title.toLowerCase()).length > 0;
        if (isDuplicated) {
          throw new ValidationError('이미 존재하는 제목입니다.');
        }

        const newId = (categories[categories.length - 1]._id += 1);
        const order = categories.length;

        const newCategory: Category = await CategoryModel.create({
          _id: newId,
          title: args.title,
          order
        });

        return newCategory;
      } catch (err) {
        throw err;
      }
    },

    async updateCategory(_: any, args: { id: number; title: string }) {
      try {
        if (!args.title) {
          throw new UserInputError('카테고리 제목을 입력해주세요.');
        }

        const categories: Category[] = await CategoryModel.find();
        if (categories.find((category) => category._id !== args.id && category.title === args.title)) {
          throw new ValidationError('이미 존재하는 제목입니다.');
        }

        const updatedCategory: Category | null = await CategoryModel.findByIdAndUpdate(
          args.id,
          {
            title: args.title
          },
          // new: true makes return update documents
          { new: true }
        );

        return updatedCategory;
      } catch (err) {
        throw err;
      }
    },

    async deleteCategory(_: any, args: { index: number }) {
      try {
        if (args.index === undefined) {
          throw new ValidationError('잘못된 index값 입니다.');
        }

        const foundCategory: Category | null = await CategoryModel.findOne({ order: args.index });

        if (foundCategory) {
          if (foundCategory._id === 0) {
            throw new ValidationError('기본 카테고리는 삭제할 수 없습니다.');
          }

          const deletedCategory: Category | null = await CategoryModel.findOneAndDelete({ order: args.index });
          if (deletedCategory === null) {
            return { isSuccess: false };
          }

          // move posts to default category
          const [posts, categories]: [Post[], Category[]] = await Promise.all([
            PostModel.find({ categoryId: foundCategory._id }),
            CategoryModel.find()
          ]);

          const postsToUpdate: Promise<any>[] = posts.map((post) => PostModel.updateOne({ _id: post._id }, { categoryId: 0 }));
          const categoriesToUpdate: Promise<any>[] = categories.map((category) => {
            if (category.order > args.index) {
              return CategoryModel.updateOne({ _id: category._id }, { order: category.order - 1 });
            }
          });

          await Promise.all([...postsToUpdate, ...categoriesToUpdate]);
        }

        return { isSuccess: true };
      } catch (err) {
        throw err;
      }
    },

    async orderCategory(_: any, args: { ids: number[] }) {
      try {
        const categoriesToUpdate: Promise<any>[] = [];

        for (let i = 0; i <= CategoryModel.length; i++) {
          const currentId = args.ids[i];
          categoriesToUpdate.push(CategoryModel.updateOne({ _id: currentId }, { order: i }));
        }

        await Promise.all([...categoriesToUpdate]);

        // NEED TO FIX: return null is bad idea...
        return null;
      } catch (err) {
        throw err;
      }
    }
  }
};
