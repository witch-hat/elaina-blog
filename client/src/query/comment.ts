import { gql } from '@apollo/client';

export interface Reply {
  username: string;
  password: string;
  createdAt: Date;
  comment: string;
}

export interface Comment {
  username: string;
  password: string;
  createdAt: Date;
  comment: string;
  replies: Reply[];
}

export interface Comments {
  _id: number;
  comments: Comment[];
}

export const GET_COMMENTS = gql`
  query($_id: Int!) {
    comments(_id: $_id) {
      _id
      comments {
        username
        password
        createdAt
        comment
        replies {
          username
          password
          comment
          createdAt
        }
      }
    }
  }
`;
