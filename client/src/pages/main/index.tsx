import React from 'react';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { ContentCategory } from 'src/pages/main/component/ContentCategory';
import { MainPageLayout, Loading } from 'src/components';
import { AppCommonProps } from '../_app';
import { ProfileType } from 'src/query';
import { CategoryDetails } from 'src/query/category';

interface Props extends AppCommonProps {
  latestPosts: any;
  profile: ProfileType;
  categories: CategoryDetails[];
}

export default function Main(props: Props) {
  return (
    <MainPageLayout profile={props.profile} isLogin={props.app.isLogin}>
      <ContentCategory categories={props.categories} latestPosts={props.latestPosts} isLogin={props.app.isLogin} />
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
