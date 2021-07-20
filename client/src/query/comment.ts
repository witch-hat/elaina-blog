import { gql } from '@apollo/client';

export interface ReplyType {
  username?: string;
  password?: string;
  createdAt: number;
  comment: string;
  isAdmin: boolean;
}

export interface CommentType {
  username?: string;
  password?: string;
  createdAt: number;
  comment: string;
  replies: ReplyType[];
  isAdmin: boolean;
}

export interface CommentContainerType {
  _id: number;
  count: number;
  comments: CommentType[];
}

export const GET_COMMENTS = gql`
  query ($_id: Int!) {
    comments(_id: $_id) {
      _id
      count
      comments {
        username
        createdAt
        comment
        isAdmin
        replies {
          username
          comment
          createdAt
          isAdmin
        }
      }
    }
  }
`;

export const WRITE_COMMENT = gql`
  mutation ($_id: Int!, $username: String, $password: String, $comment: String!, $createdAt: DateTime!, $isAdmin: Boolean!) {
    writeComment(_id: $_id, username: $username, password: $password, comment: $comment, createdAt: $createdAt, isAdmin: $isAdmin) {
      createdAt
      comment
      isAdmin
      replies
    }
  }
`;

export const EDIT_COMMENT = gql`
  mutation ($_id: Int!, $index: Int!, $newComment: String!, $password: String) {
    editComment(_id: $_id, index: $index, newComment: $newComment, password: $password) {
      isSuccess
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation ($_id: Int!, $index: Int!, $password: String) {
    deleteComment(_id: $_id, index: $index, password: $password) {
      isSuccess
    }
  }
`;

export const WRITE_REPLY = gql`
  mutation (
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
    ) {
      createdAt
      comment
      isAdmin
    }
  }
`;

export const EDIT_REPLY = gql`
  mutation ($_id: Int!, $commentIndex: Int!, $replyIndex: Int!, $newReply: String!, $password: String) {
    editReply(_id: $_id, commentIndex: $commentIndex, replyIndex: $replyIndex, newReply: $newReply, password: $password) {
      isSuccess
    }
  }
`;

export const DELETE_REPLY = gql`
  mutation ($_id: Int!, $commentIndex: Int!, $replyIndex: Int!, $password: String) {
    deleteReply(_id: $_id, commentIndex: $commentIndex, replyIndex: $replyIndex, password: $password) {
      isSuccess
    }
  }
`;
