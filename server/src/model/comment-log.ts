import { Schema, model } from 'mongoose';

export enum CommentEvent {
  NewComment,
  NewReply
}

export interface CommentLog {
  _id: number;
  time: Date;
  commentEvent: CommentEvent;
  categoryId: number;
  postId: number;
  commentIndex: number;
  replyIndex: number | null;
}

export const commentLogSchema = new Schema<CommentLog>(
  {
    _id: {
      type: Number,
      required: true
    },
    time: {
      type: Date,
      required: true
    },
    commentEvent: {
      type: Number,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    postId: {
      type: Number,
      required: true
    },
    commentIndex: {
      type: Number,
      required: true
    },
    replyIndex: {
      type: Number
    }
  },
  {
    collection: 'comment-logs'
  }
);

export const CommentLogModel = model<CommentLog>('Log', commentLogSchema);
