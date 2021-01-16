import mongoose, { Schema } from 'mongoose';
import { profileSchema, Profile } from './profile';
import { userSchema, User } from './user';

const blogSchema = new Schema({
  profile: {
    type: profileSchema,
    required: true,
    default: {}
  },
  user: {
    type: userSchema,
    required: true,
    default: {}
  }
});

export const Blog = mongoose.model('Blog', blogSchema);
