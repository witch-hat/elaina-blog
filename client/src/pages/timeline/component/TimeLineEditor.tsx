import React from 'react';
import styled from 'styled-components';

const Container = styled.div({
  width: '500px',
  display: 'flex',
  flexDirection: 'column',
  padding: '.5rem 1rem',
  backgroundColor: '#efefef'
});

const TabBar = styled.div({
  width: '100%'
});

const TabButton = styled.button({
  width: '100px',
  padding: '.5rem',
  border: 'none'
});

const Editor = styled.span({
  display: 'block',
  width: '100%',
  minHeight: '8rem',
  padding: '.5rem',
  margin: '.3rem 0 0',
  backgroundColor: '#fff',
  outline: 'none',
  '&:empty::before': {
    content: "'Write your life styles...'",
    color: '#888'
  },
  '&:empty:focus::before': {
    content: "''"
  }
});

export function TimeLineEditor() {
  return (
    <Container>
      <TabBar>
        <TabButton>Writer</TabButton>
        <TabButton>Preview</TabButton>
      </TabBar>
      <Editor role='textbox' contentEditable></Editor>
    </Container>
  );
}
