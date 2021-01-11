import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';

import { Loading } from 'src/components';
import { ContentCategory } from 'src/pages/main/component';
import { MainPageLayout } from 'src/components';

const BOOKS = gql`
  query getBooks {
    books {
      title
      author
    }
  }
`;

export default function Main() {
  const { loading, error, data } = useQuery(BOOKS);

  if (loading) return <Loading />;
  console.log('test', data);

  return (
    <MainPageLayout>
      <ContentCategory />
    </MainPageLayout>
  );
}
