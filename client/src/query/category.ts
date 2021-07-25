import { gql } from '@apollo/client';

import { MutationCommonResponse } from '.';

export interface CategoryDetailType {
  _id: number;
  title: string;
  recentCreatedAt: number | null;
  postCount: number;
  order: number;
}

export interface CategoryDetailsQueryType {
  categoriesWithDetails: CategoryDetailType[];
}

export const GET_CATEGORIES_WITH_DETAILS = gql`
  query {
    categoriesWithDetails {
      _id
      title
      postCount
      recentCreatedAt
      order
    }
  }
`;

export interface FindCategoryByIdDataType {
  title: string;
}

export interface FindCategoryByIdVars {
  id: number;
}

export interface FindCategoryByIdQueryType {
  findCategoryById: FindCategoryByIdDataType;
}

export const FIND_CATEGORY_BY_ID = gql`
  query ($id: Int!) {
    findCategoryById(id: $id) {
      title
    }
  }
`;

export interface AddCategoryDataType {
  _id: number;
  title: string;
  order: number;
}

export interface AddCategoryVars {
  title: string;
}

export interface AddCategoryQueryType {
  addCategory: AddCategoryDataType;
}

export const ADD_CATEGORY = gql`
  mutation ($title: String!) {
    addCategory(title: $title) {
      _id
      title
      order
    }
  }
`;

export interface UpdateCategoryDataType {
  title: string;
}

export interface UpdateCategoryVars {
  id: number;
  title: string;
}

export interface UpdateCategoryQueryType {
  updateCategory: UpdateCategoryDataType;
}

export const UPDATE_CATEGORY = gql`
  mutation ($id: Int, $title: String) {
    updateCategory(id: $id, title: $title) {
      title
    }
  }
`;

export interface DeleteCategoryVars {
  index: number;
}

export interface DeleteCategoryQueryType {
  deleteCategory: MutationCommonResponse;
}

export const DELETE_CATEGORY = gql`
  mutation ($index: Int!) {
    deleteCategory(index: $index) {
      isSuccess
    }
  }
`;

export interface OrderCategoryVars {
  ids: number[];
}

export interface OrderCategoryQueryType {
  orderCategory: void;
}

export const ORDER_CATEGORY = gql`
  mutation ($ids: [Int]) {
    orderCategory(ids: $ids)
  }
`;
