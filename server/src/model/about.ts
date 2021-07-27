import { Schema, model, Document } from 'mongoose';

export interface About {
  _id: number;
  updatedAt: Date;
  article: string;
}

export const aboutSchema = new Schema<About>(
  {
    _id: {
      type: Number
    },
    updatedAt: {
      type: Date
    },
    article: {
      type: String
    }
  },
  { collection: 'about' }
);

export const AboutModel = model<About>('About', aboutSchema);
