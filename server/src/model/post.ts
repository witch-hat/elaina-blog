import { Schema, model, Document, SchemaType } from 'mongoose';

export interface Post extends Document {
  _id: number;
  title: string;
  createdAt: Date;
  article: string;
  categoryId: number;
  likeCount: number;
  commentCount: number;
}

export const postSchema = new Schema<Post>(
  {
    _id: {
      type: Number,
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
    likeCount: {
      type: Number,
      required: true,
      default: 0
    },
    commentCount: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    collection: 'posts',
    versionKey: false
  }
);

export const PostModel = model<Post>('Post', postSchema);
