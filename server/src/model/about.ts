import { Schema, model, Document } from 'mongoose';

export interface About extends Document {
  updatedAt: Date;
  article: string;
}

export const aboutSchema = new Schema<About>(
  {
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
