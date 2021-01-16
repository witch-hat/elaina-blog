import mongoose, { Schema } from 'mongoose';

export const profileSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  introduce: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

export const Profile = mongoose.model('Profile', profileSchema);
