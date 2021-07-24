import { gql } from '@apollo/client';

export interface AboutQueryReturnType {
  article: string;
  updatedAt: number;
}

export const GET_ABOUT = gql`
  query {
    about {
      updatedAt
      article
    }
  }
`;

export const UPDATE_ABOUT = gql`
  mutation ($article: String) {
    updateAbout(article: $article) {
      article
      updatedAt
    }
  }
`;
