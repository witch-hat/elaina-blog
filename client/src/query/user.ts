import { gql } from '@apollo/client';

export interface User {
  emailId?: string;
  password?: string;
}

export interface LoginDevices {
  userUniqueId: string;
  latestTime: number;
}

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

export const GET_DEVICES = gql`
  query FindDevices {
    findDevices {
      userUniqueId
      latestLogin
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
      isSuccess
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;
