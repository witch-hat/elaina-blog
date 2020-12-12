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
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center'
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
