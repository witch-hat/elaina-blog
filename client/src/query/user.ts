import { gql } from '@apollo/client';

export const GET_USER = gql`
  query Me {
    me {
      emailId
      password
    }
  }
`;

export const LOGIN = gql`
  mutation Login($emailId: String!, $password: String!) {
    login(emailId: $emailId, password: $password) {
      accessToken
      user {
        _id
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout($emailId: String!) {
    logout(emailId: $emailId) {
      logout
    }
  }
`;

export interface User {
  emailId?: string;
  password?: string;
}
