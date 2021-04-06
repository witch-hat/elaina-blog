import React from 'react';
import { NextPageContext, InferGetServerSidePropsType } from 'next';

import { initApolloClient } from 'src/apollo/withApollo';
import { GET_LASTEST_POSTS } from 'src/query/post';
import { GET_CATEGORIES_WITH_DETAILS, CategoryDetails } from 'src/query/category';
import { GET_PROFILE, ProfileType } from 'src/query/profile';

import Main from './main';
import { AppCommonProps } from './_app';

interface Props extends AppCommonProps {
  latestPosts: InferGetServerSidePropsType<typeof getServerSideProps>;
  profile: InferGetServerSidePropsType<typeof getServerSideProps>;
  categories: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function Index(props: Props) {
  return <Main {...props} />;
}

export async function getServerSideProps(context: NextPageContext) {
  const apolloClient = initApolloClient({}, context);
  const profileQueryResult = await apolloClient.query({ query: GET_PROFILE });
  const categoryQueryResult = await apolloClient.query({ query: GET_CATEGORIES_WITH_DETAILS });
  const categoryLatestPostQueryResult = await apolloClient.query({ query: GET_LASTEST_POSTS });

  const profile: ProfileType = profileQueryResult.data.profile;
  const categories: CategoryDetails[] = categoryQueryResult.data.categoriesWithDetails;
  const latestPosts = categoryLatestPostQueryResult.data.getLatestPostsEachCategory;

  return {
    props: {
      latestPosts,
      profile,
      categories
    }
  };
}
