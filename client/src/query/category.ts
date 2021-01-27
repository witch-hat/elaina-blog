import { gql } from '@apollo/client';

interface Reply {
  username: string;
  password: string;
  createAt: Date;
  comment: string;
}

interface Comment {
  username: string;
  password: string;
  createAt: Date;
  comment: string;
  replies?: [Reply];
}

interface Post {
  author: string;
  postUrl: string;
  title: string;
  createAt: Date;
  article: string;
  comments?: [Comment];
}

interface Category {
  title: string;
  description: string;
  previewImage: string;
  posts?: [Post];
}

export const GET_CATEGORY = gql`
  query category {
    category {
      title
      description
      previewImage
    }
  }
`;

export const GET_POSTS = gql`
  query category {
    category {
      posts {
        author
        postUrl
        title
        createAt
        article
      }
    }
  }
`;

export const GET_COMMENTS = gql``;
