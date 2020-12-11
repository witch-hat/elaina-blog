import React from 'react';
import styled from 'styled-components';

const Container = styled.div({
  display: 'flex',
  position: 'sticky',
  top: 'calc(5rem + 20px)',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '250px',
  height: 'calc(100vh - 5rem - 40px)',
  backgroundColor: 'yellow',
  overFlowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0'
  }
});

export default function ContentNavigation() {
  return <Container>Content Navigation</Container>;
}
