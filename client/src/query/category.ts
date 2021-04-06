import { gql } from '@apollo/client';

export interface CategoryDetails {
  _id: number;
  title: string;
  description: string;
  previewImage: string;
  recentCreatedAt: Date;
  postCount: number;
  order: number;
}

export const GET_CATEGORY = gql`
  query categories {
    categories {
      _id
      title
      description
      previewImage
      order
    }
  }
`;

export const GET_CATEGORIES_WITH_DETAILS = gql`
  query {
    categoriesWithDetails {
      _id
      title
      description
      previewImage
      postCount
      recentCreatedAt
      order
    }
  }
`;

export const FIND_CATEGORY_BY_ID = gql`
  query($id: Int!) {
    findCategoryById(id: $id) {
      title
      description
      previewImage
    }
  }
`;

export const ADD_CATEGORY = gql`
  mutation($title: String!, $description: String!, $previewImage: String!) {
    addCategory(title: $title, description: $description, previewImage: $previewImage) {
      isSuccess
      _id
    }
  }
`;

export const UPDATE_CATEGORY = gql`
  mutation($id: Int, $title: String, $description: String) {
    updateCategory(id: $id, title: $title, description: $description) {
      isSuccess
    }
  }
`;

export const DELETE_CATEGORY = gql`
  mutation($index: Int!) {
    deleteCategory(index: $index) {
      isSuccess
    }
  }
`;

export const ORDER_CATEGORY = gql`
  mutation($ids: [Int]) {
    orderCategory(ids: $ids) {
      isSuccess
    }
  }
`;
