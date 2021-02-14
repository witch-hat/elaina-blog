import { gql } from '@apollo/client';

export interface FileType {
  filename?: string;
  mimetype?: string;
  encoding?: string;
  path?: string;
}

export const UPLOAD_FILE = gql`
  mutation($file: Upload!) {
    uploadFile(file: $file) {
      path
    }
  }
`;
