import { gql } from 'apollo-server';

export const profileTypeDef = gql`
  type Profile {
    image: String
    name: String
    introduce: String
    link: String
    company: String
    location: String
    email: String
  }

  type Query {
    profile: Profile
  }
`;
