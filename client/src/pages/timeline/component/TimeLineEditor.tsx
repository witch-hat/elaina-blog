import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Gfm from 'remark-gfm';

import styles from 'src/styles/MarkdownStyles.module.css';

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

const Editor = styled.pre({
  display: 'block',
  width: '100%',
  minHeight: '8rem',
  padding: '.5rem',
  margin: '.3rem 0 0',
  backgroundColor: '#fff',
  outline: 'none',
  borderRadius: '12px',
  '&:empty::before': {
    content: "'Write your life styles...'",
    color: '#888'
  },
  '&:empty:focus::before': {
    content: "''"
  }
});

export function TimeLineEditor() {
  enum Mode {
    write = 'Write',
    preview = 'Preview'
  }
  const [viewerMode, setViewerMode] = useState<Mode>(Mode.write);
  const editorRef = useRef<HTMLPreElement>(null);

  return (
    <Container>
      <TabBar>
        <TabButton onClick={() => setViewerMode(Mode.write)}>Writer</TabButton>
        <TabButton onClick={() => setViewerMode(Mode.preview)}>Preview</TabButton>
      </TabBar>
      {viewerMode === Mode.write ? (
        <Editor contentEditable ref={editorRef}></Editor>
      ) : (
        /* @ts-ignore */
        <ReactMarkdown plugins={Gfm} children={editorRef.current?.innerText} className={styles['markdown-body']} />
      )}
    </Container>
  );
}
