import { gql } from '@apollo/client';

import { MutationCommonResponse } from '.';

export interface UserType {
  emailId: string;
  password: string;
}

export interface LoginDeviceType {
  userUniqueId: string;
  latestLogin: number;
}

export interface IsAuthQueryType {
  isAuth: {
    isSuccess: boolean;
    cookie: string[];
  };
}

export const IS_AUTH = gql`
  query IsAuth {
    isAuth {
      isSuccess
      cookie
    }
  }
`;

export interface GetDeviceQueryType {
  findDevices: LoginDeviceType[];
}

export const GET_DEVICES = gql`
  query FindDevices {
    findDevices {
      userUniqueId
      latestLogin
    }
  }
`;

export interface UpdatePasswordVars {
  old: string;
  new: string;
  confirm: string;
}

export interface UpdatePasswordQueryType {
  updatePassword: MutationCommonResponse;
}

export const UPDATE_PASSWORD = gql`
  mutation updatePassword($old: String!, $new: String!, $confirm: String!) {
    updatePassword(old: $old, new: $new, confirm: $confirm) {
      isSuccess
    }
  }
`;

export interface LoginVars extends UserType {}

export interface LoginQueryType {
  login: MutationCommonResponse;
}

export const LOGIN = gql`
  mutation Login($emailId: String!, $password: String!) {
    login(emailId: $emailId, password: $password) {
      isSuccess
    }
  }
`;

export interface LogoutQueryType {
  logout: MutationCommonResponse;
}

export const LOGOUT = gql`
  mutation Logout {
    logout {
      isSuccess
    }
  }
`;
