import { Schema, model, Document, SchemaType } from 'mongoose';

interface PostModel extends Document {
  author: string;
  postUrl: string;
  title: string;
  createdAt: Date;
  article: string;
}

export const postSchema = new Schema<PostModel>(
  {
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
      type: Date,
      required: true
    }
  },
  { collection: 'posts' }
);

export const Post = model<PostModel>('Post', postSchema);
