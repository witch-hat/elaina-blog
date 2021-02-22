import { Schema, model, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export interface UserModel extends Document {
  emailId: string;
  password: string;
  auth: {
    deviceList: string[];
    refreshToken: string;
    id: number;
  };
}

export const userSchema = new Schema<UserModel>(
  {
    emailId: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    auth: {
      deviceList: {
        type: [String]
      },
      refreshToken: {
        type: String
      },
      id: {
        type: String
      }
    }
  },
  {
    collection: 'user'
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

export const User: Model<UserModel> = model('User', userSchema);
