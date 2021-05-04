import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export interface Auth {
  userUniqueId: string;
  refreshToken: string;
  id: string;
}

export interface User extends Document {
  emailId: string;
  password: string;
  auth: Auth[];
}

const authSchema = new Schema({
  userUniqueId: {
    type: String
  },
  refreshToken: {
    type: String
  },
  id: {
    type: String
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

userSchema.pre('save', function (next) {
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

export const UserModel: Model<User> = model('User', userSchema);
