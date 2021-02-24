import { values } from 'lodash';
import { Schema, model, Document, SchemaType } from 'mongoose';

interface Reply {
  username: string;
  password: string;
  createdAt: Date;
  comment: string;
}

interface Comment {
  username: string;
  password: string;
  createdAt: Date;
  comment: string;
  replies: Reply[];
}

interface CommentModel extends Document {
  _id: number;
  comments: Comment[];
}

export const commentSchema = new Schema<CommentModel>({
  _id: {
    type: Number,
    require: true
  },
  comments: {
    type: Array
  }
});

export const Comment = model<CommentModel>('Comment', commentSchema);
