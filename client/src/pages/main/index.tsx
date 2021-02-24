import React from 'react';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { ContentCategory } from 'src/pages/main/component/ContentCategory';
import { MainPageLayout, Loading } from 'src/components';
import { AppCommonProps } from '../_app';
import { initApolloClient } from 'src/apollo/withApollo';
import { GET_LASTEST_POSTS } from 'src/query/category';

interface Props extends AppCommonProps {
  profile: any;
  categories: any;
  latestPosts: any;
}

export default function Main(props: Props) {
  return (
    <MainPageLayout profile={props.profile} isLogin={props.app.isLogin}>
      <ContentCategory categories={props.categories} latestPosts={props.latestPosts} />
    </MainPageLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  return {
    redirect: {
      permanent: false,
      destination: '/'
    }
  };
}
