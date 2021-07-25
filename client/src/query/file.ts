import { gql } from '@apollo/client';

export interface FileType {
  filename?: string;
  mimetype?: string;
  encoding?: string;
  path?: string;
}

export interface UploadFileDataType {
  path: string;
}

export interface UploadFileVars {
  file: Blob | any; // what is this type??
}

export interface UploadFileQueryType {
  uploadFile: UploadFileDataType;
}

export const UPLOAD_FILE = gql`
  mutation ($file: Upload!) {
    uploadFile(file: $file) {
      path
    }
  }
`;
