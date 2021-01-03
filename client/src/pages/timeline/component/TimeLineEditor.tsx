import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
const gfm = require('remark-gfm');

import styles from 'src/styles/MarkdownStyles.module.css';

const Container = styled.div({
  width: '500px',
  display: 'flex',
  flexDirection: 'column',
  padding: '.5rem 1rem',
  backgroundColor: '#efefef'
});

const TabBar = styled.div({
  width: '100%',
  marginBottom: '.5rem'
});

const TabButton = styled.button<{ isSelected: boolean }>((props) => ({
  width: '100px',
  padding: '.5rem',
  border: 'none',
  boxShadow: props.isSelected ? 'inset 0 -3px 0 #888' : 'none'
}));

const Editor = styled.pre({
  display: 'block',
  width: '100%',
  minHeight: '8rem',
  padding: '.5rem',
  backgroundColor: '#fff',
  outline: 'none',
  borderRadius: '12px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  fontFamily: "'Nanum Gothic', sans-serif",
  '&:empty::before': {
    content: "'Write your life styles...'",
    color: '#888'
  },
  '&:empty:focus::before': {
    content: "''"
  }
});

const PreviewContainer = styled.div({
  width: '100%',
  minHeight: '8rem',
  padding: '.5rem',
  backgroundColor: '#fff',
  borderRadius: '12px'
});

export function TimeLineEditor() {
  enum Mode {
    write = 'Write',
    preview = 'Preview'
  }
  const [viewerMode, setViewerMode] = useState<Mode>(Mode.write);
  const editorRef = useRef<HTMLPreElement>(null);
  const remainText = useRef<string>();
  let text: string;

  if (editorRef.current) {
    text = editorRef.current.innerText;
    remainText.current = editorRef.current.innerText;
  } else {
    text = '';
  }

  return (
    <Container>
      <TabBar>
        <TabButton onClick={() => setViewerMode(Mode.write)} isSelected={viewerMode === Mode.write}>
          Writer
        </TabButton>
        <TabButton onClick={() => setViewerMode(Mode.preview)} isSelected={viewerMode === Mode.preview}>
          Preview
        </TabButton>
      </TabBar>
      {viewerMode === Mode.write ? (
        <Editor contentEditable ref={editorRef}>
          {remainText.current}
        </Editor>
      ) : (
        <PreviewContainer>
          <ReactMarkdown className={styles['markdown-body']} plugins={gfm} children={text} />
        </PreviewContainer>
      )}
    </Container>
  );
}
