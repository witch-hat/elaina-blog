import { gql } from 'apollo-server';
import { CategoryModel, Category } from '../model/category';
import { Post, PostModel } from '../model/post';

export const categoryTypeDef = gql`
  type Category {
    _id: Int!
    title: String!
    description: String!
    previewImage: String!
  }

  type CategoryWithDetails {
    _id: Int!
    title: String!
    description: String!
    previewImage: String!
    postCount: Int
    recentCreatedAt: DateTime
  }

  extend type Query {
    categories: [Category]
    categoriesWithDetails: [CategoryWithDetails]
  }
`;

export const categoryResolver = {
  Query: {
    async categories() {
      try {
        const categoryList = await CategoryModel.find();
        return categoryList;
      } catch (err) {
        throw err;
      }
    },

    async categoriesWithDetails() {
      try {
        const categories = await CategoryModel.find();
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
    }
  }
};
