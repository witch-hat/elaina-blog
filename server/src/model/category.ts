import { Schema, model, Document, SchemaType } from 'mongoose';

interface CategoryModel extends Document {
  title: string;
  description: string;
  previewImage: string;
}

export const categorySchema = new Schema<CategoryModel>(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    previewImage: {
      type: String
    }
  },
  {
    collection: 'categories'
  }
);

export const Category = model<CategoryModel>('Category', categorySchema);
