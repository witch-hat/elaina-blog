import { gql } from '@apollo/client';
import { MutationCommonResponse } from '.';

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

export interface GetCommentVars {
  _id: number;
}

export interface GetCommentsQueryType {
  comments: CommentContainerType;
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

export interface WriteCommentDataType {
  createdAt: number;
  comment: string;
  isAdmin: boolean;
}

export interface WriteCommentVars {
  _id: number;
  comment: string;
  createdAt: Date;
  isAdmin: boolean;
  username?: string;
  password?: string;
}

export interface WriteCommentQueryType {
  writeComment: WriteCommentDataType;
}

export const WRITE_COMMENT = gql`
  mutation ($_id: Int!, $username: String, $password: String, $comment: String!, $createdAt: DateTime!, $isAdmin: Boolean!) {
    writeComment(_id: $_id, username: $username, password: $password, comment: $comment, createdAt: $createdAt, isAdmin: $isAdmin) {
      createdAt
      comment
      isAdmin
    }
  }
`;

export interface DeleteCommentVars {
  _id: number;
  index: number;
  password?: string;
}

export interface DeleteCommentQueryType {
  deleteComment: MutationCommonResponse;
}

export const DELETE_COMMENT = gql`
  mutation ($_id: Int!, $index: Int!, $password: String) {
    deleteComment(_id: $_id, index: $index, password: $password) {
      isSuccess
    }
  }
`;

export interface EditCommentVars extends DeleteCommentVars {
  newComment: string;
}

export interface EditCommentQueryType {
  editComment: MutationCommonResponse;
}

export const EDIT_COMMENT = gql`
  mutation ($_id: Int!, $index: Int!, $newComment: String!, $password: String) {
    editComment(_id: $_id, index: $index, newComment: $newComment, password: $password) {
      isSuccess
    }
  }
`;

export interface WriteReplyVars {
  _id: number;
  commentIndex: number;
  comment: string;
  createdAt: Date;
  isAdmin: boolean;
  username?: string;
  password?: string;
}

export interface WriteReplyQueryType {
  writeReply: WriteCommentDataType;
}

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

export interface DeleteReplyVars {
  _id: number;
  commentIndex: number;
  replyIndex: number;
  password?: string;
}

export interface DeleteReplyQueryType {
  editReply: MutationCommonResponse;
}

export const DELETE_REPLY = gql`
  mutation ($_id: Int!, $commentIndex: Int!, $replyIndex: Int!, $password: String) {
    deleteReply(_id: $_id, commentIndex: $commentIndex, replyIndex: $replyIndex, password: $password) {
      isSuccess
    }
  }
`;

export interface EditReplyVars extends DeleteReplyVars {
  newReply: string;
}

export interface EditReplyQueryType {
  editReply: MutationCommonResponse;
}

export const EDIT_REPLY = gql`
  mutation ($_id: Int!, $commentIndex: Int!, $replyIndex: Int!, $newReply: String!, $password: String) {
    editReply(_id: $_id, commentIndex: $commentIndex, replyIndex: $replyIndex, newReply: $newReply, password: $password) {
      isSuccess
    }
  }
`;
