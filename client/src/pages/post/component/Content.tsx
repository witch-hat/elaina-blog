import React from 'react';
import styled from 'styled-components';

const Container = styled.div({
  width: '800px',
  display: 'flex',
  padding: '.5rem 1rem',
  flexDirection: 'column',
  jusitfyContent: 'flex-start',
  alignItems: 'center',
  minHeight: 'calc(100vh - 5rem - 40px)',
  backgroundColor: 'red'
});

export default function Content() {
  return <Container>Content</Container>;
}
