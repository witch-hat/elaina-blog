import { Schema, model, Document, SchemaType } from 'mongoose';

interface Reply {
  username: string;
  password: string;
  createdAt: Date;
  comment: string;
}

interface CommentModel extends Document {
  postId: number;
  username: string;
  password: string;
  createdAt: Date;
  comment: string;
  replies?: [Reply];
}

function ReplyType(this: SchemaType, key: any, options: any) {
  SchemaType.call(this, key, options, 'ReplyType');
}

Object.setPrototypeOf(ReplyType.prototype, SchemaType.prototype);

ReplyType.prototype.cast = function (value: Reply): Reply {
  return value;
};

// @ts-ignore
Schema.Types.ReplyType = ReplyType;

export const commentSchema = new Schema<CommentModel>({
  postId: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  creaetdAt: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  replies: {
    type: [ReplyType]
  }
});

export const Comment = model<CommentModel>('Comment', commentSchema);
