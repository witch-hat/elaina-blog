import { gql } from '@apollo/client';

export interface Post {
  _id: number;
  author: string;
  postUrl: string;
  title: string;
  createdAt: string;
  article: string;
  commentId: number;
  categoryId: number;
}

export const GET_POSTS = gql`
  query post {
    posts {
      _id
      author
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
      author
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
      author
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
