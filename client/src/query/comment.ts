import { gql } from '@apollo/client';
import { MutationCommonResponse } from '.';

export interface ReplyType {
  _id: string;
  username?: string;
  password?: string;
  createdAt: number;
  comment: string;
  isAdmin: boolean;
  isEdited: boolean;
}

export interface CommentType {
  _id: string;
  username?: string;
  password?: string;
  createdAt: number;
  comment: string;
  replies: ReplyType[];
  isAdmin: boolean;
  isEdited: boolean;
}

export interface CommentContainerType {
  _id: number;
  count: number;
  comments: CommentType[];
}

export interface GetCommentVars {
  pid: number;
}

export interface GetCommentsQueryType {
  comments: CommentContainerType;
}

export const GET_COMMENTS = gql`
  query ($pid: Int!) {
    comments(pid: $pid) {
      _id
      count
      comments {
        _id
        username
        createdAt
        comment
        isAdmin
        replies {
          _id
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
  pid: number;
  comment: string;
  createdAt: Date;
  isAdmin: boolean;
  username?: string;
  password?: string;
}

export interface WriteCommentQueryType {
  writeComment: CommentContainerType;
}

export const WRITE_COMMENT = gql`
  mutation ($pid: Int!, $username: String, $password: String, $comment: String!, $createdAt: DateTime!, $isAdmin: Boolean!) {
    writeComment(pid: $pid, username: $username, password: $password, comment: $comment, createdAt: $createdAt, isAdmin: $isAdmin) {
      _id
      count
      comments {
        _id
        username
        createdAt
        comment
        isAdmin
        replies {
          _id
          username
          comment
          createdAt
          isAdmin
        }
      }
    }
  }
`;

export interface DeleteCommentVars {
  pid: number;
  commentId: string;
  password?: string;
}

export interface DeleteCommentQueryType {
  deleteComment: MutationCommonResponse;
}

export const DELETE_COMMENT = gql`
  mutation ($pid: Int!, $commentId: String!, $password: String) {
    deleteComment(pid: $pid, commentId: $commentId, password: $password) {
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
  mutation ($pid: Int!, $commentId: String!, $newComment: String!, $password: String) {
    editComment(pid: $pid, commentId: $commentId, newComment: $newComment, password: $password) {
      isSuccess
    }
  }
`;

export interface WriteReplyVars {
  pid: number;
  commentId: string;
  comment: string;
  createdAt: Date;
  isAdmin: boolean;
  username?: string;
  password?: string;
}

export interface WriteReplyQueryType {
  writeReply: CommentType;
}

export const WRITE_REPLY = gql`
  mutation (
    $pid: Int!
    $commentId: String!
    $username: String
    $password: String
    $comment: String!
    $createdAt: DateTime!
    $isAdmin: Boolean!
  ) {
    writeReply(
      pid: $pid
      commentId: $commentId
      username: $username
      password: $password
      comment: $comment
      createdAt: $createdAt
      isAdmin: $isAdmin
    ) {
      _id
      username
      createdAt
      comment
      isAdmin
      replies {
        _id
        username
        comment
        createdAt
        isAdmin
      }
    }
  }
`;

export interface DeleteReplyVars {
  pid: number;
  commentId: string;
  replyId: string;
  password?: string;
}

export interface DeleteReplyQueryType {
  editReply: MutationCommonResponse;
}

export const DELETE_REPLY = gql`
  mutation ($pid: Int!, $commentId: String!, $replyId: String!, $password: String) {
    deleteReply(pid: $pid, commentId: $commentId, replyId: $replyId, password: $password) {
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
  mutation ($pid: Int!, $commentId: String!, $replyId: String!, $newReply: String!, $password: String) {
    editReply(pid: $pid, commentId: $commentId, replyId: $replyId, newReply: $newReply, password: $password) {
      isSuccess
    }
  }
`;
