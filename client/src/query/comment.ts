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
    writeComment(_id: $_id, username: $username, password: $password, comment: $comment, createdAt: $createdAt, isAdmin: $isAdmin)
  }
`;

export const EDIT_COMMENT = gql`
  mutation($_id: Int!, $index: Int!, $newComment: String!, $password: String) {
    editComment(_id: $_id, index: $index, newComment: $newComment, password: $password)
  }
`;

export const DELETE_COMMENT = gql`
  mutation($_id: Int!, $index: Int!, $password: String) {
    deleteComment(_id: $_id, index: $index, password: $password)
  }
`;

export const WRITE_REPLY = gql`
  mutation(
    $_id: Int!
    $commentIndex: Int!
    $username: String
    $password: String
    $comment: String!
    $createdAt: DateTime!
    $isAdmin: Boolean!
  ) {
    writeReply(
      _id: $_id
      commentIndex: $commentIndex
      username: $username
      password: $password
      comment: $comment
      createdAt: $createdAt
      isAdmin: $isAdmin
    )
  }
`;

export const EDIT_REPLY = gql`
  mutation($_id: Int!, $commentIndex: Int!, $replyIndex: Int!, $newReply: String!, $password: String) {
    editReply(_id: $_id, commentIndex: $commentIndex, replyIndex: $replyIndex, newReply: $newReply, password: $password)
  }
`;

export const DELETE_REPLY = gql`
  mutation($_id: Int!, $commentIndex: Int!, $replyIndex: Int!, $password: String) {
    deleteReply(_id: $_id, commentIndex: $commentIndex, replyIndex: $replyIndex, password: $password)
  }
`;
