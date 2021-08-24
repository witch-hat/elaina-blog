import { Schema, model } from 'mongoose';

export interface Category {
  _id: number;
  title: string;
  order: number;
}

export const categorySchema = new Schema<Category>(
  {
    _id: {
      type: Number,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    order: {
      type: Number
    }
  },
  {
    collection: 'categories',
    versionKey: false
  }
);

export const CategoryModel = model<Category>('Category', categorySchema);
