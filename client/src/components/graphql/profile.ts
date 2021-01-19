import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query profile {
    profile {
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

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $image: String
    $name: String
    $introduce: String
    $link: String
    $company: String
    $location: String
    $email: String
  ) {
    updataProfile(image: $image, name: $name, introduce: $introduce, link: $link, company: $company, location: $location, email: $email) {
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

export interface ProfileType {
  image?: string;
  name?: string;
  introduce?: string;
  link?: string;
  company?: string;
  location?: string;
  email?: string;
}
