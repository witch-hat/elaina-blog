import mongoose, { Schema } from 'mongoose';

import { profileSchema } from './profile';
import { userSchema, User } from './user';
import { categorySchema } from './category';

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
  },
  category: {
    type: categorySchema,
    default: {}
  }
});

export const Blog = mongoose.model('Blog', blogSchema);
