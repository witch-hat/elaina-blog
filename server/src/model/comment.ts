import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export interface Reply {
  _id?: string;
  username?: string;
  password?: string;
  createdAt: Date;
  comment: string;
  isAdmin: boolean;
  isEdited: boolean;
}

export interface Comment {
  _id?: string;
  username?: string;
  password?: string;
  createdAt: Date;
  comment: string;
  replies: Reply[];
  isAdmin: boolean;
  isEdited: boolean;
}

export interface CommentConatiner {
  _id: number;
  count: number;
  comments: Comment[];
}

const replySchema = new Schema<Reply>({
  username: {
    type: String
  },
  password: {
    type: String
  },
  createdAt: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  isEdited: {
    type: Boolean,
    require: true,
    default: false
  }
});

const commentSchema = new Schema<Comment>({
  username: {
    type: String
  },
  password: {
    type: String
  },
  createdAt: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  replies: {
    type: [replySchema],
    required: true,
    default: []
  },
  isAdmin: {
    type: Boolean,
    required: true
  },
  isEdited: {
    type: Boolean,
    require: true,
    default: false
  }
});

export const commentContainerSchema = new Schema<CommentConatiner>(
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
      type: [commentSchema],
      required: true,
      default: []
    }
  },
  {
    collection: 'comments',
    versionKey: false
  }
);

replySchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

commentSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

export const CommentModel = model<CommentConatiner>('Comment', commentContainerSchema);
