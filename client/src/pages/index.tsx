import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_PROFILE, ProfileType, UPDATE_PROFILE } from 'src/query';
import { NextPageContext, InferGetStaticPropsType, InferGetServerSidePropsType } from 'next';
import { initApolloClient } from 'src/apollo/withApollo';
// import { initializeApollo } from 'src/apollo/apolloClient';

import Main from './main';
import { AppCommonProps } from './_app';

interface Props extends AppCommonProps {
  profile: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function Index(props: Props) {
  return <Main {...props} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const apolloClient = initApolloClient({}, context);
  const { data } = await apolloClient.query({ query: GET_PROFILE });
  const profile = data.profile;

  return {
    props: {
      profile
    }
  };
}
