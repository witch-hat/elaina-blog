import React from 'react';
import styled from 'styled-components';

const Container = styled.div({
  width: '800px',
  display: 'flex',
  marginTop: '20px',
  flexDirection: 'column',
  jusitfyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '20rem',
  backgroundColor: 'skyblue'
});

export default function Comment() {
  return <Container>Comment</Container>;
}
