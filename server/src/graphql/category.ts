import { gql } from 'apollo-server';
import { CategoryModel, Category } from '../model/category';
import { CommentModel } from '../model/comment';
import { Post, PostModel } from '../model/post';
import { ContextType } from '../types/context';

export const categoryTypeDef = gql`
  type Category {
    _id: Int!
    title: String!
    description: String!
    previewImage: String!
    order: Int!
  }

  type CategoryWithDetails {
    _id: Int!
    title: String!
    description: String!
    previewImage: String!
    postCount: Int
    recentCreatedAt: DateTime
  }

  type AddResoponse {
    isAdded: Boolean
  }

  type DeleteResponse {
    isDeleted: Boolean
  }

  extend type Query {
    categories: [Category]
    categoriesWithDetails: [CategoryWithDetails]
    findCategoryById(id: Int!): Category
  }

  extend type Mutation {
    addCategory(title: String!, description: String!, previewImage: String!): AddResoponse
    deleteCategory(index: Int!): DeleteResponse
  }
`;

export const categoryResolver = {
  Query: {
    async categories() {
      try {
        const categoryList = await CategoryModel.find({}, {}, { sort: { order: 1 } });
        return categoryList;
      } catch (err) {
        throw err;
      }
    },

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
            recentCreatedAt
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

        if (categoryList.filter((category) => category.title === args.title).length) {
          return { isAdded: false };
        }

        const newId = (categoryList[categoryList.length - 1]._id += 1);

        CategoryModel.create({
          _id: newId,
          title: args.title,
          description: args.description,
          previewImage: args.previewImage
        });

        return { isAdded: true };
      } catch (err) {
        return { isAdded: false };
      }
    },

    async deleteCategory(_: any, args: { index: number }, context: ContextType) {
      try {
        if (args.index === undefined) {
          return { isDeleted: false };
        }

        const deletedCategory: Category = await CategoryModel.findOne({ order: args.index });

        if (deletedCategory._id === 0) {
          return { isDeleted: false };
        }

        await CategoryModel.deleteOne({ order: args.index });

        // move posts to default category
        const posts: Post[] = await PostModel.find({ categoryId: deletedCategory._id });
        posts.forEach(async (post) => {
          await PostModel.findByIdAndUpdate(post._id, { categoryId: 0 });
        });

        return { isDeleted: true };
      } catch (err) {
        return { isDeleted: false };
      }
    }
  }
};
