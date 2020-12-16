import React from 'react';
import styled from 'styled-components';

import { Content, ContentNavigation, PostCategory, Comment } from './component';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start'
});

const ContentContainer = styled.div({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '@media screen and (max-width: 1280px)': {
    width: '72%'
  },
  '@media screen and (max-width: 768px)': {
    width: '100%'
  }
});

export default function Post() {
  return (
    <Container>
      <PostCategory />
      <ContentContainer>
        <Content />
        <Comment />
      </ContentContainer>
      <ContentNavigation />
    </Container>
  );
}
