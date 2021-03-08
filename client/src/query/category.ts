import { gql } from '@apollo/client';

export interface CategoryDetails {
  title: string;
  description: string;
  previewImage: string;
  recentCreatedAt: Date;
  postCount: number;
}

export const GET_CATEGORY = gql`
  query categories {
    categories {
      title
      description
      previewImage
    }
  }
`;

export const GET_CATEGORIES_WITH_DETAILS = gql`
  query {
    categoriesWithDetails {
      title
      description
      previewImage
      postCount
      recentCreatedAt
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
