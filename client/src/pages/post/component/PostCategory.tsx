import React from 'react';
import styled from 'styled-components';

const Container = styled.div({
  width: '250px',
  display: 'flex',
  flexDirection: 'column',
  position: 'sticky',
  top: 'calc(5rem + 20px)',
  alignItems: 'center',
  justifyContent: 'flex-start',
  backgroundColor: 'blue',
  height: 'calc(100vh - 5rem - 40px)',
  padding: '.5rem',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0'
  }
});

export default function PostCategory() {
  return <Container>Post Category</Container>;
}
