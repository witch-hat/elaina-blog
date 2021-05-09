import { gql } from '@apollo/client';

export enum CommentEvent {
  newComment,
  newReply
}

export interface CommentLog {
  _id: number;
  time: Date;
  event: CommentEvent;
  categoryId: number;
  postId: number;
  commentIndex: number;
  replyIndex: number | null;
}

export const GET_LOGS = gql`
  query {
    logs {
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

export const PUSH_LOG = gql`
  mutation($time: DateTime!, $event: Int!, $categoryId: Int!, $postId: Int!, $commentIndex: Int!, $replyIndex: Int) {
    pushLog(time: $time, event: $event, categoryId: $categoryId, postId: $postId, commentIndex: $commentIndex, replyIndex: $replyIndex)
  }
`;

export const DELETE_LOG = gql`
  mutation($postId: Int!, $commentIndex: Int!, $replyIndex: Int) {
    deleteLog(postId: $postId, commentIndex: $commentIndex, replyIndex: $replyIndex)
  }
`;

export const DELETE_POST_ALL_LOG = gql`
  mutation($postId: Int!) {
    deletePostAllLog(postId: $postId)
  }
`;
