import { gql } from '@apollo/client';

interface Post {
  _id: number;
  author: string;
  postUrl: string;
  title: string;
  createdAt: Date;
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
