import React, { createElement, useEffect, useRef } from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import styles from 'src/styles/MarkdownStyles.module.css';
import gfm from 'remark-gfm';

import { Menu } from './Menu';
import { useWidth } from 'src/components';
import { theme } from 'src/styles';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  width: '100%'
}));

const EditorContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: '1'
});

const Editor = styled.div<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  marginTop: '.75rem',
  height: 'calc(100vh - 8.75rem - 40px)',
  fontFamily: "'Nanum Gothic', sans-serif",
  outline: 'none',
  padding: '.5rem',
  border: `1px solid ${theme[props.themeMode].borderColor}`,
  borderRadius: '12px',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap',
  overflowY: 'auto',
  backgroundColor: theme[props.themeMode].editorBackground
}));

const PreviewContainer = styled.div({
  display: 'flex',
  flex: '1',
  height: 'calc(100vh - 5rem - 40px)',
  marginLeft: '2rem',
  padding: '.5rem',
  overflowY: 'auto',
  '@media screen and (max-width: 767px)': {
    display: 'none'
  }
});

const Paragraph = styled.p({
  display: 'inline-block',
  width: '100%',
  wordBreak: 'break-word',
  whiteSpace: 'pre-wrap'
});

const Button = styled.button({
  borderRadius: '8px',
  padding: '.3rem',
  display: 'none',
  '@media screen and (max-width: 767px)': {
    display: 'block'
  }
});

function Text(props: { children?: string }) {
  return <Paragraph>{props.children !== undefined ? props.children : <br></br>}</Paragraph>;
}

enum Mode {
  write = 'Editor',
  preview = 'Preview'
}

interface Props {}

export function Writer(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const editor = useRef<HTMLDivElement>(null);
  const [text, setText] = useState<string>('');
  const width = useWidth();
  const [mode, setMode] = useState(Mode.write);

  useEffect(() => {
    if (mode == Mode.write) {
      editor.current?.focus();
    }
  }, [mode]);

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

  function handleButtonClick() {
    if (mode === Mode.write) {
      setMode(Mode.preview);
    } else {
      setMode(Mode.write);
    }
  }
  console.log(editor.current?.childNodes);

  return (
    <Container themeMode={themeMode}>
      <EditorContainer>
        <Button onClick={() => handleButtonClick()}>{mode === Mode.write ? Mode.preview : Mode.write}</Button>
        {((width <= 767 && mode === Mode.write) || width > 767) && (
          <>
            <Menu ref={editor} setText={setText} />
            <Editor
              ref={editor}
              contentEditable={true}
              suppressContentEditableWarning={true}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onInput={parseTextContent}
              themeMode={themeMode}
            >
              <Text></Text>
            </Editor>
          </>
        )}
        {width <= 767 && mode === Mode.preview && (
          <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']} children={text}></ReactMarkdown>
        )}
      </EditorContainer>
      <PreviewContainer>
        <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']} children={text}></ReactMarkdown>
      </PreviewContainer>
    </Container>
  );
}
