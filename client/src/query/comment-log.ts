import { gql } from '@apollo/client';

export enum CommentEvent {
  newComment,
  newReply
}

export interface CommentLog {
  _id: number;
  time: number;
  event: CommentEvent;
  categoryId: number;
  postId: number;
  commentIndex: number;
  replyIndex: number | null;
}

export const GET_COMMENT_LOGS = gql`
  query {
    commentLogs {
      _id
      time
      event
      categoryId
      postId
      commentIndex
      replyIndex
    }
  }
`;

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

export const DELETE_COMMENT_LOG = gql`
  mutation ($postId: Int!, $commentIndex: Int!, $replyIndex: Int) {
    deleteCommentLog(postId: $postId, commentIndex: $commentIndex, replyIndex: $replyIndex)
  }
`;

export const DELETE_POST_ALL_COMMENT_LOG = gql`
  mutation ($postId: Int!) {
    deletePostAllCommentLog(postId: $postId)
  }
`;
