import { gql } from "@apollo/client";

import { MutationCommonResponse } from ".";

export interface TempPostType {
  _id: number;
  categoryId: number;
  cateogry: string;
  title: string;
  article: string;
  savedAt: number;
}

export interface GetTempPostVars {
  page: number;
}

export interface GetTempPostQueryType {
  tempPosts: TempPostType[];
}

export const GET_TEMP_POSTS = gql`
  query ($page: Int!) {
    tempPosts(page: $page) {
      _id
      categoryId
      category
      title
      article
      savedAt
    }
  }
`;

export interface SaveTempPostVars {
  id: number;
  category: string;
  title: string;
  article: string;
}

export interface SaveTempPostQueryType {
  saveTempPost: MutationCommonResponse;
}

export const SAVE_TEMP_POST = gql`
  mutation ($id: Int!, $category: String!, $title: String!, $article: String!) {
    saveTempPost(
      id: $id
      category: $category
      title: $title
      article: $article
    ) {
      isSuccess
    }
  }
`;

export interface DeleteTempPostVars {
  id: number;
}

export interface DeleteTempPostQueryType {
  deleteTempPost: MutationCommonResponse;
}

export const DELETE_TEMP_POST = gql`
  mutation ($id: Int!) {
    deleteTempPost(id: $id) {
      isSuccess
    }
  }
`;
