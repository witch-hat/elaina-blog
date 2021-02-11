import React from 'react';
import { GET_PROFILE, ProfileType, UPDATE_PROFILE } from 'src/query';
import { NextPageContext, InferGetStaticPropsType } from 'next';
import { initializeApollo } from 'src/apollo/apolloClient';

import Main from './main';
import { AppCommonProps } from './_app';

interface Props extends AppCommonProps {
  profile: InferGetStaticPropsType<typeof getStaticProps>;
}

export default function Index(props: Props) {
  return <Main {...props}></Main>;
}

export async function getStaticProps(context: NextPageContext) {
  const apolloClient = initializeApollo(null);
  const { data } = await apolloClient.query({ query: GET_PROFILE });
  const profile = data.profile;

  return {
    props: {
      profile
    }
  };
}
