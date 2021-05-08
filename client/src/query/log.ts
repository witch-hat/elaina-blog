import { gql } from '@apollo/client';

export enum Event {
  newCategory,
  newPost,
  newComment,
  newReply,
  movePost
}

export interface Log {
  _id: number;
  time: Date;
  event: Event;
  description: string;
  categoryId: number;
  postId: number | null;
  commentIndex: number | null;
  replyIndex: number | null;
}

export const GET_LOGS = gql`
  query {
    logs {
      _id
      time
      event
      categoryId
    }
  }
`;

export const PUSH_LOG = gql`
  mutation($time: DateTime!, $event: Int!, $categoryId: Int!, $postId: Int, $commentIndex: Int, $replyIndex: Int) {
    pushLog(time: $time, event: $event, categoryId: $categoryId, postId: $postId, commentIndex: $commentIndex, replyIndex: $replyIndex)
  }
`;

export const DELETE_LOG = gql`
  mutation($_id: Int!) {
    deleteLog(_id: $_id)
  }
`;
