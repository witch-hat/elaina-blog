import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { ProfileType } from 'src/query/profile';
import { About } from 'src/query/about';
import { FormatUnifier } from 'src/utils';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.section({
  width: '100%',
  minHeight: '100vh',
  marginTop: '2rem'
});

const ContentInfoWrapper = styled.div({
  display: 'flex'
});

const Author = styled.span({
  display: 'flex',
  marginRight: '1rem',
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
  // const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
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
