import styled from 'styled-components';
import { NextPageContext, InferGetStaticPropsType } from 'next';

import { GET_PROFILE } from 'src/query';
import { initializeApollo } from 'src/apollo/apolloClient';
import { MainPageLayout } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { AppCommonProps } from '../_app';

interface Props extends AppCommonProps {
  profile: InferGetStaticPropsType<typeof getStaticProps>;
}

export default function About(props: Props) {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <MainPageLayout profile={props.profile} isLogin={props.app.cookie !== null}>
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
