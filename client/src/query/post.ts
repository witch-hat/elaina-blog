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
      postUrl
      title
      createdAt
      article
      commentId
      categoryId
    }
  }
`;

export const GET_LAST_POST = gql`
  query {
    lastPost {
      _id
      author
      postUrl
      title
      createdAt
      article
      commentId
      categoryId
    }
  }
`;

export const FIND_POST_BY_URL = gql`
  query($requestUrl: String!) {
    findPostByUrl(requestUrl: $requestUrl) {
      _id
      author
      postUrl
      title
      createdAt
      article
      commentId
      categoryId
    }
  }
`;

export const FIND_SAME_CATEGORY_POSTS = gql`
  query($categoryId: Int!) {
    findSameCategoryPosts(categoryId: $categoryId) {
      post {
        title
        postUrl
      }
      category {
        title
      }
    }
  }
`;
