import { Schema, model, Document } from 'mongoose';

export const fileSchema = new Schema(
  {
    name: {
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
    }
  },
  {
    collection: 'file'
  }
);

interface File extends Document {
  name: string;
  mimetype: string;
  encoding: string;
}

export const File = model<File>('file', fileSchema);
