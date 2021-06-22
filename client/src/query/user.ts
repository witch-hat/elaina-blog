import { gql } from '@apollo/client';

export const GET_USER = gql`
  query Me {
    me {
      emailId
      password
    }
  }
`;

export const IS_AUTH = gql`
  query IsAuth {
    isAuth {
      isAuth
      cookie
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($old: String!, $new: String!, $confirm: String!) {
    updatePassword(old: $old, new: $new, confirm: $confirm)
  }
`;

export const LOGIN = gql`
  mutation Login($emailId: String!, $password: String!) {
    login(emailId: $emailId, password: $password) {
      auth {
        refreshToken
        deviceList
        id
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

export interface User {
  emailId?: string;
  password?: string;
}
