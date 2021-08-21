import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export interface Auth {
  userUniqueId: string;
  refreshToken: string;
  id: string;
  latestLogin: Date;
}

export interface User {
  emailId: string;
  password: string;
  auth: Auth[];
}

const authSchema = new Schema<Auth>({
  userUniqueId: {
    type: String
  },
  refreshToken: {
    type: String
  },
  id: {
    type: String
  },
  latestLogin: {
    type: Date
  }
});

export const userSchema = new Schema<User>(
  {
    _id: {
      type: Number,
      required: true
    },
    emailId: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    auth: {
      type: [authSchema],
      default: []
    }
  },
  {
    collection: 'user',
    versionKey: false
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

export const UserModel = model<User>('User', userSchema);
