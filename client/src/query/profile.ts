import { gql } from '@apollo/client';

export interface ProfileDataType {
  _id: string;
  image: string;
  name: string;
  introduce: string;
  link?: string;
  company?: string;
  location?: string;
  email?: string;
}

export interface GetProfileQueryType {
  profile: ProfileDataType;
}

export const GET_PROFILE = gql`
  query profile {
    profile {
      _id
      image
      name
      introduce
      link
      company
      location
      email
    }
  }
`;

export interface UpdateProfileVars extends ProfileDataType {
  link: string;
  company: string;
  location: string;
  email: string;
}

export interface UpdateProfileQueryType {
  updateProfile: ProfileDataType;
}

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $_id: String
    $image: String
    $name: String
    $introduce: String
    $link: String
    $company: String
    $location: String
    $email: String
  ) {
    updateProfile(
      _id: $_id
      image: $image
      name: $name
      introduce: $introduce
      link: $link
      company: $company
      location: $location
      email: $email
    ) {
      _id
      image
      name
      introduce
      link
      company
      location
      email
    }
  }
`;
