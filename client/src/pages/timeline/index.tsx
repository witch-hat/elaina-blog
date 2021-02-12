import React from 'react';
import styled from 'styled-components';
import { NextPageContext, InferGetStaticPropsType } from 'next';

import { GET_PROFILE } from 'src/query';
import { initializeApollo } from 'src/apollo/apolloClient';
import { MainPageLayout } from 'src/components';
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
    <MainPageLayout profile={props.profile} isLogin={props.app.cookie !== null}>
      <Container>
        <TimeLineEditor />
      </Container>
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
