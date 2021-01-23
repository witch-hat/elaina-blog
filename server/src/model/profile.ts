import { Schema, model, Document } from 'mongoose';

export const profileSchema = new Schema(
  {
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
  },
  {
    collection: 'profile'
  }
);

interface Profile extends Document {
  image: string;
  name: string;
  introduce: string;
  link: string;
  company: string;
  location: string;
  email: string;
}

export const Profile = model<Profile>('Profile', profileSchema);
