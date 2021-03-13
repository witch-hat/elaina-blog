import React from 'react';
import styled from 'styled-components';
import { NextPageContext, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

import { GET_PROFILE, ProfileType } from 'src/query';
import { initApolloClient } from 'src/apollo/withApollo';
import { MainPageLayout } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { AppCommonProps } from '../_app';
import { About, GET_ABOUT } from 'src/query/about';
import { FormatUnifier } from 'src/utils';

const Container = styled.div({
  marginTop: '2rem',
  width: '100%'
});

const ContentInfoWrapper = styled.div({
  display: 'flex'
});

const Author = styled.span({
  marginRight: '1rem',
  display: 'flex',
  alignItems: 'center'
});

const Time = styled.span({
  display: 'flex',
  alignItems: 'center'
});

const Article = styled.article({
  marginTop: '1.5rem'
});

interface Props extends AppCommonProps {
  profile: InferGetStaticPropsType<typeof getServerSideProps>;
  about: InferGetStaticPropsType<typeof getServerSideProps>;
}

export default function AboutPage(props: Props) {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const about: About = props.about;
  const profile: ProfileType = props.profile;
  const updatedAt = new Date(about.updatedAt);
  const formatHelper = new FormatUnifier.FormatDate();

  return (
    <MainPageLayout profile={props.profile} isLogin={props.app.isLogin}>
      <Container>
        <div>
          <ContentInfoWrapper>
            <Author>
              <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
              {profile.name}
            </Author>
            <Time>
              <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5rem' }} />
              {formatHelper.getFullFormatDate(updatedAt)}
            </Time>
          </ContentInfoWrapper>
        </div>
        <Article>
          <ReactMarkdown plugins={[gfm]}>{about.article}</ReactMarkdown>
        </Article>
      </Container>
    </MainPageLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const apolloClient = initApolloClient({}, context);
  const profileQueryResult = await apolloClient.query({ query: GET_PROFILE });
  const profile = profileQueryResult.data.profile;

  const aboutQueryResult = await apolloClient.query({ query: GET_ABOUT });
  const about = aboutQueryResult.data.about;

  return {
    props: {
      profile,
      about
    }
  };
}
