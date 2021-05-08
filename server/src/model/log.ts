import { Schema, model, Document } from 'mongoose';

export enum Event {
  newCategory,
  newPost,
  newComment,
  newReply,
  movePost
}

export interface Log extends Document {
  _id: number;
  time: Date;
  event: Event;
  categoryId: number;
  postId: number | null;
  commentIndex: number | null;
  replyIndex: number | null;
}

export const logSchema = new Schema<Log>(
  {
    _id: {
      type: Number,
      required: true
    },
    time: {
      type: Date,
      required: true
    },
    event: {
      type: Number,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    postId: {
      type: Number
    },
    commentIndex: {
      type: Number
    },
    replyIndex: {
      type: Number
    }
  },
  {
    collection: 'logs'
  }
);

export const LogModel = model<Log>('Log', logSchema);
