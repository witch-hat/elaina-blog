import { gql } from '@apollo/client';

interface Post {
  _id: number;
  author: string;
  postUrl: string;
  title: string;
  createdAt: Date;
  article: string;
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
    }
  }
`;
