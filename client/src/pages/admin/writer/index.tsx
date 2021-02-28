import React from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType, NextPageContext } from 'next';

import { MenuButton } from './component/MenuButton';
import { Writer } from './component/Writer';
import { theme } from 'src/styles';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { isAuth } from 'src/pages/api/isAuth';
import { AppCommonProps, appCommponProps } from 'src/pages/_app';
import { initApolloClient } from 'src/apollo/withApollo';
import { GET_PROFILE, ProfileType } from 'src/query';
import { GET_CATEGORY } from 'src/query/category';

const Container = styled.div<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  width: '100%',
  borderRadius: '12px',
  padding: '.5rem'
}));

interface Props extends AppCommonProps {
  profile: InferGetServerSidePropsType<typeof getServerSideProps>;
  categories: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function Admin(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const profile: ProfileType = props.profile;

  return (
    <Container themeMode={themeMode}>
      {/* <MenuButton isActive={true} desc={'D'}></MenuButton> */}
      <Writer author={profile.name || ''} categories={props.categories} />
    </Container>
  );
}

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
