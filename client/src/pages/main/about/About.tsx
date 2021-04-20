import React from 'react';
import styled from 'styled-components';
import { NextPageContext, InferGetStaticPropsType } from 'next';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { GET_PROFILE, ProfileType } from 'src/query/profile';
import { initApolloClient } from 'src/apollo/withApollo';
import { MainPageLayout } from 'src/pages/main/component/MainPageLayout';
import { About, GET_ABOUT } from 'src/query/about';
import { FormatUnifier } from 'src/utils';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

import { AppCommonProps } from '../_app';

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

interface Props {
  about: About;
  profile: ProfileType;
}

export function AboutPage(props: Props) {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const about: About = props.about;
  const profile: ProfileType = props.profile;
  const updatedAt = new Date(about.updatedAt);

  return (
    // <MainPageLayout profile={props.profile} isLogin={props.app.isLogin}>
    <Container>
      <div>
        <ContentInfoWrapper>
          <Author>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
            {profile.name}
          </Author>
          <Time>
            <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5rem' }} />
            {FormatUnifier.getFullFormatDate(updatedAt)}
          </Time>
        </ContentInfoWrapper>
      </div>
      <Article>
        <ReactMarkdown plugins={[gfm]}>{about.article}</ReactMarkdown>
      </Article>
    </Container>
    // </MainPageLayout>
  );
}
