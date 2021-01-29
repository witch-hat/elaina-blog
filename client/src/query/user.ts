import { gql } from '@apollo/client';

export const GET_USER = gql`
  query Me {
    me {
      emailId
      password
    }
  }
`;

export interface User {
  emailId?: string;
  password?: string;
}
