import { gql } from '@apollo/client';

export interface PostType {
  _id: number;
  title: string;
  createdAt: number;
  article: string;
  categoryId: number;
  likeCount: number;
  commentCount: number;
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

export const FIND_POST_BY_ID = gql`
  query ($id: String!) {
    findPostById(id: $id) {
      _id
      title
      createdAt
      article
      categoryId
    }
  }
`;

export const FIND_SAME_CATEGORY_POSTS = gql`
  query ($categoryId: Int!) {
    findSameCategoryPosts(categoryId: $categoryId) {
      post {
        _id
        title
        article
        createdAt
        likeCount
        commentCount
      }
      category {
        title
      }
    }
  }
`;

export const GET_LATEST_POSTS_PER_CATEGORY = gql`
  query {
    getLatestPostsEachCategory {
      _id
      categoryId
      title
      article
    }
  }
`;

export const WRITE_POST = gql`
  mutation ($title: String!, $createdAt: DateTime, $article: String!, $category: String!) {
    writePost(title: $title, createdAt: $createdAt, article: $article, category: $category) {
      _id
    }
  }
`;

export const DELETE_POST = gql`
  mutation ($id: Int!) {
    deletePost(id: $id) {
      isSuccess
      categoryId
    }
  }
`;

export const EDIT_POST = gql`
  mutation ($id: Int!, $title: String!, $article: String!, $category: String!) {
    editPost(id: $id, title: $title, article: $article, category: $category)
  }
`;

export const SEARCH = gql`
  query ($keyword: String!) {
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

export interface LatestPostQueryReturnType {
  _id: number;
  title: string;
  createdAt: number;
  article: string;
  likeCount: number;
  commentCount: number;
}

export const GET_LATEST_POSTS = gql`
  query ($page: Int!) {
    getLatestPosts(page: $page) {
      _id
      title
      createdAt
      article
      likeCount
      commentCount
    }
  }
`;
