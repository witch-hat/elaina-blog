import { gql } from '@apollo/client';

export interface CategoryDetailType {
  _id: number;
  title: string;
  recentCreatedAt: number | null;
  postCount: number;
  order: number;
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

export const FIND_CATEGORY_BY_ID = gql`
  query ($id: Int!) {
    findCategoryById(id: $id) {
      title
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation ($title: String!) {
    addCategory(title: $title) {
      _id
      title
      order
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation ($id: Int, $title: String) {
    updateCategory(id: $id, title: $title) {
      title
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation ($index: Int!) {
    deleteCategory(index: $index) {
      isSuccess
    }
  }
`;

export const ORDER_CATEGORY = gql`
  mutation ($ids: [Int]) {
    orderCategory(ids: $ids)
  }
`;
