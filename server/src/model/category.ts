import { Schema, model, Document, SchemaType } from 'mongoose';

interface Reply {
  username: string;
  password: string;
  createAt: Date;
  comment: string;
}

interface Comment {
  username: string;
  password: string;
  createAt: Date;
  comment: string;
  replies?: [Reply];
}

interface Post {
  author: string;
  postUrl: string;
  title: string;
  createAt: Date;
  article: string;
  comments?: [Comment];
}

interface CategoryModel extends Document {
  title: string;
  description: string;
  previewImage: string;
  posts?: [Post];
}

function PostType(this: SchemaType, key: any, options: any): void {
  SchemaType.call(this, key, options, 'PostType');
}
Object.setPrototypeOf(PostType.prototype, SchemaType.prototype);

PostType.prototype.cast = function (value: Post): Post {
  return value;
};

// @ts-ignore
// need to fix
Schema.Types.PostType = PostType;

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
    },
    posts: {
      type: [PostType]
    }
  },
  {
    collection: 'category'
  }
);

export const Category = model<CategoryModel>('Category', categorySchema);
