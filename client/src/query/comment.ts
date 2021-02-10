import { gql } from '@apollo/client';

interface Reply {
  username: string;
  password: string;
  createdAt: Date;
  comment: string;
}

interface Comment {
  username: string;
  password: string;
  createdAt: Date;
  comment: string;
  replies?: [Reply];
}

export const GET_COMMENTS = gql`
  query comments {
    comments {
      postId
      username
      password
      createdAt
      comment
    }
  }
`;
