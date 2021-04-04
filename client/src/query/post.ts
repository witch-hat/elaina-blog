import { gql } from '@apollo/client';

export interface Post {
  _id: number;
  title: string;
  createdAt: string;
  article: string;
  categoryId: number;
}

export const GET_POSTS = gql`
  query post {
    posts {
      _id
      title
      createdAt
      article
      categoryId
    }
  }
`;

export const GET_LAST_POST = gql`
  query {
    lastPost {
      _id
      title
      createdAt
      article
      commentId
    }
  }
`;

export const FIND_POST_BY_URL = gql`
  query($requestUrl: String!) {
    findPostByUrl(requestUrl: $requestUrl) {
      _id
      title
      createdAt
      article
      categoryId
    }
  }
`;

export const FIND_SAME_CATEGORY_POSTS = gql`
  query($categoryId: Int!) {
    findSameCategoryPosts(categoryId: $categoryId) {
      post {
        _id
        title
      }
      category {
        title
      }
    }
  }
`;

export const GET_LASTEST_POSTS = gql`
  query {
    getLatestPostsEachCategory {
      _id
    }
  }
`;

export const WRITE_POST = gql`
  mutation($title: String!, $createdAt: DateTime, $article: String!, $category: String!) {
    writePost(title: $title, createdAt: $createdAt, article: $article, category: $category) {
      _id
    }
  }
`;

export const DELETE_POST = gql`
  mutation($id: Int!) {
    deletePost(id: $id) {
      isSuccess
      categoryId
    }
  }
`;

export const EDIT_POST = gql`
  mutation($id: Int!, $title: String!, $article: String!, $category: String!) {
    editPost(id: $id, title: $title, article: $article, category: $category) {
      isSuccess
    }
  }
`;

export const SEARCH = gql`
  query($keyword: String!) {
    search(keyword: $keyword) {
      result {
        post {
          _id
          title
          createdAt
          categoryId
        }
        content
      }
    }
  }
`;
