import { Schema, model } from 'mongoose';

export interface File {
  filename: string;
  mimetype: string;
  encoding: string;
  path: string;
}

export const fileSchema = new Schema<File>(
  {
    filename: {
      type: String,
      required: true
    },
    mimetype: {
      type: String,
      required: true
    },
    encoding: {
      type: String,
      required: true
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    collection: 'file',
    versionKey: false
  }
);

export const FileModel = model<File>('File', fileSchema);
