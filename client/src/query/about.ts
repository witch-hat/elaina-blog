import { gql } from '@apollo/client';

export interface About {
  article: string;
  updatedAt: Date;
}

export const GET_ABOUT = gql`
  query {
    about {
      updatedAt
      article
    }
  }
`;
