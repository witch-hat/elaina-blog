import { Schema, model, Document } from 'mongoose';

export const fileSchema = new Schema(
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

interface File extends Document {
  filename: string;
  mimetype: string;
  encoding: string;
  path: string;
}

export const FileModel = model<File>('File', fileSchema);
