import React, { createElement, useEffect, useRef } from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import styles from 'src/styles/MarkdownStyles.module.css';
import gfm from 'remark-gfm';

const Editor = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '500px',
  fontFamily: "'Nanum Gothic', sans-serif",
  outline: 'none',
  padding: '.5rem',
  border: '1px solid #888',
  borderRadius: '12px'
});

const Paragraph = styled.p({
  display: 'inline-block',
  width: '100%'
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
      if (editor.current?.textContent?.length === 0) {
        e.preventDefault();
      }
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLDivElement>) {
    e.preventDefault();
    const clipedData = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, clipedData);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
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
      <div style={{ marginLeft: '2rem', display: 'flex', flexDirection: 'column' }}>
        <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']} children={text}></ReactMarkdown>
      </div>
    </div>
  );
}
