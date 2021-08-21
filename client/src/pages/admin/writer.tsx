import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { Writer } from 'src/components/pages/admin';
import { initializeApollo } from 'src/lib/apollo';
import { GetProfileQueryType, GET_PROFILE, ProfileDataType } from 'src/query/profile';
import { appCommponProps } from 'src/pages/_app';
import { CategoryDetailType, GET_CATEGORIES_WITH_DETAILS, CategoryDetailsQueryType } from 'src/query/category';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  borderRadius: '.5rem',
  padding: '.5rem'
});

interface ServerSideProps {
  profile: ProfileDataType;
  categories: CategoryDetailType[];
}

interface Props extends ServerSideProps {}

export default function WriterPage(props: Props) {
  const router = useRouter();

  const profile: ProfileDataType = props.profile;
  const categoryTitleFromQuery = router.query.category as string | undefined;
  const categories: CategoryDetailType[] = props.categories;

  if (categoryTitleFromQuery && !categories.find((category) => category.title === categoryTitleFromQuery)) {
    alert('존재하지 않는 Category Title 입니다.');
    router.push('/');
  }

  return (
    <Container>
      {categoryTitleFromQuery ? (
        <Writer author={profile.name || ''} categories={categories} category={categoryTitleFromQuery} />
      ) : (
        <Writer author={profile.name || ''} categories={categories} />
      )}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login?url=%2Fadmin%2Fwriter'
      }
    };
  }

  const client = initializeApollo({}, context);
  const [profileQuery, categoryQuery] = await Promise.all([
    client.query<GetProfileQueryType>({ query: GET_PROFILE }),
    client.query<CategoryDetailsQueryType>({ query: GET_CATEGORIES_WITH_DETAILS })
  ]);

  const profile = profileQuery.data.profile;
  const categories = categoryQuery.data.categoriesWithDetails;

  return {
    props: {
      profile,
      categories
    }
  };
};
