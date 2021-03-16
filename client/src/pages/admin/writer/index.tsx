import React from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { withRouter, NextRouter, useRouter } from 'next/router';

import { Writer } from 'src/components/writer/Writer';
import { theme } from 'src/styles';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { isAuth } from 'src/pages/api/isAuth';
import { AppCommonProps, appCommponProps } from 'src/pages/_app';
import { initApolloClient } from 'src/apollo/withApollo';
import { GET_PROFILE, ProfileType } from 'src/query';
import { CategoryDetails, GET_CATEGORY } from 'src/query/category';

const Container = styled.div<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  width: '100%',
  borderRadius: '12px',
  padding: '.5rem'
}));

interface WithRouterProps {
  router: NextRouter;
}

interface Props extends AppCommonProps, WithRouterProps {
  profile: InferGetServerSidePropsType<typeof getServerSideProps>;
  categories: InferGetServerSidePropsType<typeof getServerSideProps>;
}

function WriterPage(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const profile: ProfileType = props.profile;
  const categoryTitleFromQuery = props.router.query.title as string | undefined;
  const categories: CategoryDetails[] = props.categories;
  const router = useRouter();

  if (categoryTitleFromQuery && !categories.find((category) => category.title === categoryTitleFromQuery)) {
    alert('존재하지 않는 Category Title 입니다.');
    router.push('/');
  }

  return (
    <Container themeMode={themeMode}>
      {categoryTitleFromQuery ? (
        <Writer author={profile.name || ''} categories={categories} category={categoryTitleFromQuery} />
      ) : (
        <Writer author={profile.name || ''} categories={categories} />
      )}
    </Container>
  );
}

export default withRouter(WriterPage);

export async function getServerSideProps(context: NextPageContext) {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login'
      }
    };
  }

  const client = initApolloClient({}, context);
  const profileQuery = await client.query({ query: GET_PROFILE });
  const categoryQuery = await client.query({ query: GET_CATEGORY });

  const profile = profileQuery.data.profile;
  const categories = categoryQuery.data.categories;

  return {
    props: {
      profile,
      categories
    }
  };
}
