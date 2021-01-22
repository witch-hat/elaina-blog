import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export const userSchema = new Schema({
  emailId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

interface User extends Document {
  emailId: string;
  password: string;
}

userSchema.pre<User>('save', function (next) {
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

export const User = model<User>('User', userSchema);
