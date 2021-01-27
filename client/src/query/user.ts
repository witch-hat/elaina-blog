import { gql } from '@apollo/client';

export const GET_USER = gql`
  query user {
    user {
      emailId
      password
    }
  }
`;

export interface User {
  emailId?: string;
  password?: string;
}
