import React from 'react';
import { GET_PROFILE } from 'src/query';
import { NextPageContext, InferGetServerSidePropsType } from 'next';
import { initApolloClient } from 'src/apollo/withApollo';
import { GET_CATEGORIES_WITH_DETAILS, GET_LASTEST_POSTS } from 'src/query/category';

import Main from './main';
import { AppCommonProps } from './_app';

interface Props extends AppCommonProps {
  profile: InferGetServerSidePropsType<typeof getServerSideProps>;
  categories: InferGetServerSidePropsType<typeof getServerSideProps>;
  latestPosts: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function Index(props: Props) {
  return <Main {...props} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const apolloClient = initApolloClient({}, context);
  const profileQueryResult = await apolloClient.query({ query: GET_PROFILE });
  const categoryQueryResult = await apolloClient.query({ query: GET_CATEGORIES_WITH_DETAILS });
  const categoryLatestPostQueryResult = await apolloClient.query({ query: GET_LASTEST_POSTS });

  const profile = profileQueryResult.data.profile;
  const categoryInfo = categoryQueryResult.data.categoriesWithDetails;
  const latestPosts = categoryLatestPostQueryResult.data.getLatestPosts;

  console.log(latestPosts);

  return {
    props: {
      profile,
      categories: categoryInfo,
      latestPosts
    }
  };
}
