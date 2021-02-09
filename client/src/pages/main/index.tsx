import React from 'react';
import { NextPageContext } from 'next';

import { ContentCategory } from 'src/pages/main/component/ContentCategory';
import { MainPageLayout, Loading } from 'src/components';

interface Props {
  profile: never;
}

export default function Main({ profile }: Props) {
  return (
    <MainPageLayout profile={profile}>
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
