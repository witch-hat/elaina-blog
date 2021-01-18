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

export interface ProfileType {
  image?: string;
  name?: string;
  introduce?: string;
  link?: string;
  company?: string;
  location?: string;
  email?: string;
  _typename?: string;
}
