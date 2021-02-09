import styled from 'styled-components';
import { NextPageContext, InferGetStaticPropsType } from 'next';

import { GET_PROFILE } from 'src/query';
import { initializeApollo } from 'src/apollo/apolloClient';
import { MainPageLayout } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.section({});

export default function About({ profile }: InferGetStaticPropsType<typeof getStaticProps>) {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <MainPageLayout profile={profile}>
      <div>About</div>
    </MainPageLayout>
  );
}

export async function getStaticProps(context: NextPageContext) {
  const apolloClient = initializeApollo(null);
  const { data } = await apolloClient.query({ query: GET_PROFILE });
  const profile = data.profile;

  return {
    props: {
      profile
    }
  };
}
