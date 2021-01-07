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

const Editor = styled.div({
  display: 'flex',
  flex: '1',
  position: 'relative',
  flexDirection: 'column',
  height: 'calc(100vh - 5rem - 40px)',
  fontFamily: "'Nanum Gothic', sans-serif",
  outline: 'none',
  padding: '3.5rem .5rem .5rem',
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
      <Editor
        ref={editor}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onInput={parseTextContent}
      >
        <Menu />
        <Text></Text>
      </Editor>
      <PreviewContainer>
        <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']} children={text}></ReactMarkdown>
      </PreviewContainer>
    </Container>
  );
}
