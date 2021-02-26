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

interface Comments extends Document {
  _id: number;
  count: number;
  comments: Comment[];
}

export const commentSchema = new Schema<Comments>(
  {
    _id: {
      type: Number,
      require: true
    },
    count: {
      type: Number,
      default: 0,
      required: true
    },
    comments: {
      type: Array,
      default: []
    }
  },
  {
    collection: 'comments',
    versionKey: false
  }
);

export const CommentModel = model<Comments>('Comment', commentSchema);
