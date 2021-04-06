import React from 'react';
import styled from 'styled-components';
import { NextPageContext } from 'next';

import { GET_PROFILE } from 'src/query/profile';
import { initApolloClient } from 'src/apollo/withApollo';
import { MainPageLayout } from 'src/pages/main/component/MainPageLayout';
import { TimeLineEditor } from './component/TimeLineEditor';
import { AppCommonProps } from '../_app';

const Container = styled.div({
  margin: '2rem 0 0'
});

interface Props extends AppCommonProps {
  profile: never;
}

export default function TimeLine(props: Props) {
  return (
    <MainPageLayout profile={props.profile} isLogin={props.app.isLogin}>
      <Container>
        <TimeLineEditor />
      </Container>
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
