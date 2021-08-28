import { gql } from '@apollo/client';

import { MutationCommonResponse } from '.';

export enum CommentEvent {
  NewComment,
  NewReply
}

export interface CommentLogDataType {
  _id: number;
  time: number;
  event: CommentEvent;
  categoryId: number;
  postId: number;
  commentIndex: number;
  replyIndex: number | null;
  postTitle: string;
}

export interface CommentLogVars {
  page: number;
}

export interface CommentLogQueryType {
  commentLogs: CommentLogDataType[];
}

export const GET_COMMENT_LOGS = gql`
  query ($page: Int!) {
    commentLogs(page: $page) {
      _id
      time
      event
      categoryId
      postId
      commentIndex
      replyIndex
      postTitle
    }
  }
`;

export interface PushCommentLogVars {
  time: Date;
  event: number;
  categoryId: number;
  postId: number;
  commentIndex: number;
  replyIndex?: number;
}

export interface PushCommentLogQueryType {
  pushCommentLog: void;
}

export const PUSH_COMMENT_LOG = gql`
  mutation ($time: DateTime!, $event: Int!, $categoryId: Int!, $postId: Int!, $commentIndex: Int!, $replyIndex: Int) {
    pushCommentLog(
      time: $time
      event: $event
      categoryId: $categoryId
      postId: $postId
      commentIndex: $commentIndex
      replyIndex: $replyIndex
    )
  }
`;

export interface DeleteCommentLogVars {
  postId: number;
  commentIndex: number;
  replyIndex?: number;
}

export interface DeleteCommentLogQueryType {
  deleteCommentLog: MutationCommonResponse;
}

export const DELETE_COMMENT_LOG = gql`
  mutation ($postId: Int!, $commentIndex: Int!, $replyIndex: Int) {
    deleteCommentLog(postId: $postId, commentIndex: $commentIndex, replyIndex: $replyIndex) {
      isSuccess
    }
  }
`;

export interface DeletePostAllCommentLogVars {
  postId: number;
}

export interface DeletePostAllCommentLogQueryType {
  deletePostAllCommentLog: void;
}

export const DELETE_POST_ALL_COMMENT_LOG = gql`
  mutation ($postId: Int!) {
    deletePostAllCommentLog(postId: $postId)
  }
`;
