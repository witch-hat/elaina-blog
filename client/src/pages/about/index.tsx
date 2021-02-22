import styled from 'styled-components';
import { NextPageContext, InferGetStaticPropsType } from 'next';

import { GET_PROFILE } from 'src/query';
import { initApolloClient } from 'src/apollo/withApollo';
import { MainPageLayout } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { AppCommonProps } from '../_app';

interface Props extends AppCommonProps {
  profile: InferGetStaticPropsType<typeof getServerSideProps>;
}

export default function About(props: Props) {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <MainPageLayout profile={props.profile} isLogin={props.app.isLogin}>
      <div>About</div>
    </MainPageLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const apolloClient = initApolloClient({}, context);
  const { data } = await apolloClient.query({ query: GET_PROFILE });
  const profile = data.profile;

  return {
    props: {
      profile
    }
  };
}
