import React from 'react';
import styled from 'styled-components';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '250px',
  minHeight: '100%',
  backgroundColor: 'yellow'
});

export default function ContentNavigation() {
  return <Container>Content Navigation</Container>;
}
