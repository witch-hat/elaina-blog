import React from 'react';
import styled from 'styled-components';

const Container = styled.div({
  width: '800px',
  display: 'flex',
  flexDirection: 'column',
  jusitfyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '85vh',
  backgroundColor: 'red'
});

export default function Content() {
  return <Container>Content</Container>;
}
