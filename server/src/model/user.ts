import mongoose, { Schema } from 'mongoose';

export const userSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  pw: {
    type: String,
    required: true
  }
});

export const User = mongoose.model('User', userSchema);
