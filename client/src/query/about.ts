import { gql } from '@apollo/client';

export interface AboutDataType {
  article: string;
  updatedAt: number;
}

export interface AboutQueryType {
  about: AboutDataType;
}

export const GET_ABOUT = gql`
  query {
    about {
      updatedAt
      article
    }
  }
`;

export interface UpdateAboutVars {
  article: string;
}

export interface UpdateAboutQueryType {
  updateAbout: AboutDataType;
}

export const UPDATE_ABOUT = gql`
  mutation ($article: String) {
    updateAbout(article: $article) {
      article
      updatedAt
    }
  }
`;
