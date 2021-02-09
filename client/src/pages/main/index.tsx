import React from 'react';
import { NextPageContext, InferGetStaticPropsType } from 'next';

import { ContentCategory } from 'src/pages/main/component/ContentCategory';
import { MainPageLayout, Loading } from 'src/components';
import { GET_PROFILE, ProfileType, UPDATE_PROFILE } from 'src/query';
import { initializeApollo } from 'src/apollo/apolloClient';

export default function Main({ profile }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainPageLayout profile={profile}>
      <ContentCategory />
    </MainPageLayout>
  );
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
