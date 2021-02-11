import React from 'react';
import { NextPageContext } from 'next';

import { ContentCategory } from 'src/pages/main/component/ContentCategory';
import { MainPageLayout, Loading } from 'src/components';
import { AppCommonProps } from '../_app';

interface Props extends AppCommonProps {
  profile: never;
}

export default function Main(props: Props) {
  return (
    <MainPageLayout profile={props.profile} isLogin={props.app.cookie !== null}>
      <ContentCategory />
    </MainPageLayout>
  );
}

export function getServerSideProps({ req, res }: NextPageContext) {
  return {
    redirect: {
      permanent: false,
      destination: '/'
    }
  };
}
