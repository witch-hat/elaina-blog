import React, { createElement, useEffect, useRef } from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import styles from 'src/styles/MarkdownStyles.module.css';
import gfm from 'remark-gfm';

import { Menu } from './Menu';

const Container = styled.div({
  display: 'flex',
  width: '100%'
});

const EditorContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: '1'
});

const Editor = styled.div({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  marginTop: '.75rem',
  height: 'calc(100vh - 8.75rem - 40px)',
  fontFamily: "'Nanum Gothic', sans-serif",
  outline: 'none',
  padding: '.5rem',
  border: '1px solid #888',
  borderRadius: '12px',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  overflowY: 'auto'
});

const PreviewContainer = styled.div({
  display: 'flex',
  flex: '1',
  height: 'calc(100vh - 5rem - 40px)',
  marginLeft: '2rem',
  padding: '.5rem',
  overflowY: 'auto'
});

const Paragraph = styled.p({
  display: 'inline-block',
  width: '100%',
  wordBreak: 'keep-all'
});

function Text(props: { children?: string }) {
  return <Paragraph>{props.children !== undefined ? props.children : <br></br>}</Paragraph>;
}

interface Props {}

export function Writer(props: Props) {
  const editor = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>('');

  useEffect(() => {
    editor.current?.focus();
  }, []);

  function parseTextContent() {
    if (editor.current !== null) {
      setText(editor.current.innerText.replaceAll('\n\n', '  \n').replaceAll('\n  \n', '\n&#8203;  \n').replaceAll('\n\n', '\n'));
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    // if (e.key === '1') {
    //   document.execCommand('insertHTML', false, '<span>**dsa**</span>');
    //   e.preventDefault();
    // }
    console.log(editor.current.childNodes.length);
    if (e.key === 'Backspace') {
      if (editor.current?.textContent?.length === 0 && editor.current.childNodes.length === 1) {
        e.preventDefault();
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const clipedData = e.clipboardData.getData('text/plain').replaceAll('&#8203;', '');
    console.log(clipedData.split('').map((t) => t === ''));
    document.execCommand('insertText', false, clipedData);
  }

  return (
    <Container>
      <EditorContainer>
        <Menu ref={editor} />
        <Editor
          ref={editor}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onInput={parseTextContent}
        >
          <Text></Text>
        </Editor>
      </EditorContainer>
      <PreviewContainer>
        <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']} children={text}></ReactMarkdown>
      </PreviewContainer>
    </Container>
  );
}
