import { Schema, model, Document } from 'mongoose';

export const tokenSchema = new Schema(
  {
    refreshToken: {
      hash: {
        type: String
      },
      expires: {
        type: Date
      }
    }
  },
  { collection: 'token' }
);

interface TokenModel extends Document {
  refreshToken: {
    hash: string;
    expires: Date;
  };
}

export const Token = model<TokenModel>('Token', tokenSchema);
