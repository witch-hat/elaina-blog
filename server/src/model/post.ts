import { Schema, model, Document, SchemaType } from 'mongoose';

export interface Post extends Document {
  _id: number;
  author: string;
  postUrl: string;
  title: string;
  createdAt: Date;
  article: string;
  commentId: number;
  categoryId: number;
}

export const postSchema = new Schema<Post>(
  {
    _id: {
      type: Number,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    postUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    },
    article: {
      type: String,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    commentId: {
      type: Number,
      required: true
    }
  },
  { collection: 'posts' }
);

export const PostModel = model<Post>('Post', postSchema);
