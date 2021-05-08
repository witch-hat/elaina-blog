import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export interface Reply {
  username?: string;
  password?: string;
  createdAt: Date;
  comment: string;
  isAdmin: boolean;
}

export interface Comment {
  username?: string;
  password?: string;
  createdAt: Date;
  comment: string;
  replies: Reply[];
  isAdmin: boolean;
}

interface ReplySchemaType extends Document {
  username?: string;
  password?: string;
  createdAt: Date;
  comment: string;
  isAdmin: boolean;
}

interface CommentSchemaType extends Document {
  username?: string;
  password?: string;
  createdAt: Date;
  comment: string;
  replies: Reply[];
  isAdmin: boolean;
}

export interface Comments extends Document {
  _id: number;
  count: number;
  comments: Comment[];
}

const replySchema = new Schema<ReplySchemaType>({
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
  }
});

const commentSchema = new Schema<CommentSchemaType>({
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
  }
});

export const commentContainerSchema = new Schema<Comments>(
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

replySchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err: Error, salt: string) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (err: Error, hash: string) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

commentSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err: Error, salt: string) => {
      if (err) return next(err);

      bcrypt.hash(this.password, salt, (err: Error, hash: string) => {
        if (err) return next(err);
        this.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

export const CommentModel = model<Comments>('Comment', commentContainerSchema);
