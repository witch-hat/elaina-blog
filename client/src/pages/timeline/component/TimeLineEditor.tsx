import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import Gfm from 'remark-gfm';

import styles from 'src/styles/MarkdownStyles.module.css';

const Container = styled.div({
  display: 'flex',
  width: '500px',
  padding: '.5rem 1rem',
  backgroundColor: '#efefef',
  flexDirection: 'column'
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
  display: 'inline-block',
  width: '100%',
  minHeight: '8rem',
  padding: '.5rem',
  backgroundColor: '#fff',
  outline: 'none',
  borderRadius: '.5rem',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  fontFamily: "'Nanum Gothic', sans-serif",
  fontSize: '1rem',
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
  borderRadius: '.5rem'
});

const Paragraph = styled.p({
  display: 'inline-block',
  width: '100%'
});

const ParagraphContent = styled.span({
  display: 'inline-block',
  height: '100%',
  '&:empty::before': {
    content: "'Write your post...'"
  }
});

function Text(props: { children?: string }) {
  return (
    <Paragraph>
      <ParagraphContent>{props.children}</ParagraphContent>
    </Paragraph>
  );
}

export function TimeLineEditor() {
  enum Mode {
    write = 'Write',
    preview = 'Preview'
  }
  let text: string;

  const [viewerMode, setViewerMode] = useState<Mode>(Mode.write);
  const editorRef = useRef<HTMLPreElement>(null);
  const remainText = useRef<string>();
  const [tagText, setTagText] = useState<string>('');
  const [initlizedP, setInitilizedP] = useState<Node>();
  const [initilizeSpan, setInitilizeSpan] = useState<Node>();

  useEffect(() => {
    if (editorRef.current?.firstChild?.firstChild) {
      setTagText(editorRef.current.firstElementChild?.outerHTML || '');
      setInitilizedP(editorRef.current.firstChild);
      setInitilizeSpan(editorRef.current.firstChild.firstChild);
    }
  }, []);

  if (editorRef.current) {
    text = editorRef.current.innerText;
    remainText.current = editorRef.current.innerText;
  } else {
    text = '';
  }

  function handlePasteEvent(e: React.ClipboardEvent<HTMLPreElement>) {
    e.preventDefault();
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
        <Editor contentEditable ref={editorRef} onPaste={handlePasteEvent} suppressContentEditableWarning>
          {remainText.current}
        </Editor>
      ) : (
        <PreviewContainer>
          <ReactMarkdown className={styles['markdown-body']} plugins={[Gfm]} children={text} />
        </PreviewContainer>
      )}
    </Container>
  );
}
