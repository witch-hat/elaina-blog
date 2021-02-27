import React from 'react';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { ContentCategory } from 'src/pages/main/component/ContentCategory';
import { MainPageLayout, Loading } from 'src/components';
import { AppCommonProps } from '../_app';

interface Props extends AppCommonProps {
  latestPosts: any;
}

export default function Main(props: Props) {
  return (
    <MainPageLayout profile={props.app.profile} isLogin={props.app.isLogin}>
      <ContentCategory categories={props.app.categoryInfo} latestPosts={props.latestPosts} />
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
