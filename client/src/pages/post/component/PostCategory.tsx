import React from 'react';
import styled from 'styled-components';

const Container = styled.div({
  width: '250px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: 'blue',
  minHeight: '100%',
  padding: '.5rem'
});

export default function PostCategory() {
  return <Container>Post Category</Container>;
}
