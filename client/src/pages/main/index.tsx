import React from 'react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';

import { ContentCategory } from 'src/pages/main/component/ContentCategory';
import { MainPageLayout } from 'src/pages/main/component/MainPageLayout';
import { ProfileType } from 'src/query/profile';
import { CategoryDetails } from 'src/query/category';

import { AppCommonProps } from '../_app';
import { AboutPage } from './about/About';

interface Props extends AppCommonProps {
  latestPosts: any;
  profile: ProfileType;
  categories: CategoryDetails[];
  about: never;
}

export default function Main(props: Props) {
  const router = useRouter();

  if (router.query['tab'] === 'about') {
    return (
      <MainPageLayout profile={props.profile} isLogin={props.app.isLogin}>
        <AboutPage profile={props.profile} about={props.about} />
      </MainPageLayout>
    );
  }

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
