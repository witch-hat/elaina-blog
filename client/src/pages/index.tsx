import React from 'react';
import { NextPageContext, InferGetServerSidePropsType } from 'next';
import { initApolloClient } from 'src/apollo/withApollo';
import { GET_LASTEST_POSTS } from 'src/query/post';

import Main from './main';
import { AppCommonProps } from './_app';

interface Props extends AppCommonProps {
  latestPosts: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function Index(props: Props) {
  return <Main {...props} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const apolloClient = initApolloClient({}, context);
  const categoryLatestPostQueryResult = await apolloClient.query({ query: GET_LASTEST_POSTS });

  const latestPosts = categoryLatestPostQueryResult.data.getLatestPostsEachCategory;

  return {
    props: {
      latestPosts
    }
  };
}
