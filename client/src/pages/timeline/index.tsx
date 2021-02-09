import React from 'react';
import styled from 'styled-components';
import { NextPageContext, InferGetStaticPropsType } from 'next';

import { GET_PROFILE } from 'src/query';
import { initializeApollo } from 'src/apollo/apolloClient';
import { MainPageLayout } from 'src/components';
import { TimeLineEditor } from './component/TimeLineEditor';

const Container = styled.div({
  margin: '2rem 0 0'
});

export default function TimeLine({ profile }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <MainPageLayout profile={profile}>
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
