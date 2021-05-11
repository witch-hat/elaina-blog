import React from 'react';
import styled from 'styled-components';

import { ClapBox } from './ClapBox';
import { ContentNavigation } from './ContentNavigation';

const Container = styled.nav({
  display: 'flex',
  flex: 1,
  position: 'sticky',
  top: 'calc(5rem + 20px)',
  padding: '.5rem',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: 'calc(100vh - 5rem - 20px)',
  overFlowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0'
  },
  '@media screen and (max-width: 1380px)': {
    display: 'none',
    opacity: 0
  }
});

const StyledHr = styled.hr({
  display: 'block',
  width: '100%',
  marginLeft: '.5rem',
  border: 'none',
  borderTop: '1px solid #ddd',
  borderRadius: '.5rem',
  boxSizing: 'border-box'
});

interface Props {
  commentsCount: number;
  scrollToComment: Function;
}

export function RightSideContainer(props: Props) {
  return (
    <Container>
      <ContentNavigation />
      <StyledHr />
      <ClapBox commentsCount={props.commentsCount} scrollToComment={props.scrollToComment} />
    </Container>
  );
}
