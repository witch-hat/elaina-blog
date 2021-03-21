import { gql } from '@apollo/client';

export interface Reply {
  username?: string;
  password?: string;
  createdAt: Date;
  comment: string;
  isAdmin: boolean;
}

export interface Comment {
  username?: string;
  password?: string;
  createdAt: Date;
  comment: string;
  replies: Reply[];
  isAdmin: boolean;
}

export interface Comments {
  _id: number;
  count: number;
  comments: Comment[];
}

export const GET_COMMENTS = gql`
  query($_id: Int!) {
    comments(_id: $_id) {
      _id
      count
      comments {
        username
        password
        createdAt
        comment
        isAdmin
        replies {
          username
          password
          comment
          createdAt
          isAdmin
        }
      }
    }
  }
`;

export const WRITE_COMMENT = gql`
  mutation($_id: Int!, $username: String, $password: String, $comment: String!, $createdAt: DateTime!, $isAdmin: Boolean!) {
    writeComment(_id: $_id, username: $username, password: $password, comment: $comment, createdAt: $createdAt, isAdmin: $isAdmin) {
      isSuccess
      errorMsg
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation($_id: Int!, $index: Int!) {
    deleteComment(_id: $_id, index: $index) {
      isSuccess
      errorMsg
    }
  }
`;
