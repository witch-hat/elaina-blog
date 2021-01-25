import mongoose, { Schema, model, Document, SchemaType } from 'mongoose';

interface Comment {
  username: string;
  password: string;
  createdAt: Date;
  comment: string;
  replies?: [Comment];
}

interface Post {
  username: string;
  postUrl: string;
  title: string;
  createdAt: Date;
  article: string;
  comments?: [Comment];
}

interface CategoryModel extends Document {
  name: string;
  description: string;
  previewImage: string;
  posts?: [Post];
}

function PostType(key: string, options: any): void {
  SchemaType.call(this, key, options, 'PostType');
}
PostType.prototype = Object.create(SchemaType.prototype);

PostType.prototype.cast = function (value: Post): Post {
  return value;
};

export const categorySchema = new Schema<CategoryModel>({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  previewImage: {
    type: String
  },
  posts: {
    type: [PostType]
  }
});

export const Category = model<CategoryModel>('Category');
