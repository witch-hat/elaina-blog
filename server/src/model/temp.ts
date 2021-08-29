import { Schema, model } from 'mongoose';

export interface Temp {
  _id: number;
  categoryId: number;
  title: string;
  article: string;
  savedAt: Date;
}

export const tempSchema = new Schema<Temp>(
  {
    _id: {
      type: Number,
      required: true
    },
    categoryId: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    article: {
      type: String,
      required: true
    },
    savedAt: {
      type: Date,
      required: true
    }
  },
  {
    collection: 'temp',
    versionKey: false
  }
);

export const TempModel = model<Temp>('Temp', tempSchema);
