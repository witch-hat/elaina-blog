import React from 'react';
import { useQuery, gql } from '@apollo/client';

import { Loading } from 'src/components';
import { ContentCategory } from 'src/pages/main/component';
import { MainPageLayout } from 'src/components';

const GET_NAME = gql`
  query profile {
    profile {
      name
    }
  }
`;

export default function Main() {
  const { loading, error, data } = useQuery(GET_NAME);

  if (loading) return <Loading />;
  console.log('test', data.profile[0].name);

  return (
    <MainPageLayout>
      <ContentCategory />
    </MainPageLayout>
  );
}
