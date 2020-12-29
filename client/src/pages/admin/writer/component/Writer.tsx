import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Editor = styled.pre({
  display: 'flex',
  flexDirection: 'column',
  width: '500px',
  whiteSpace: 'pre-line'
});

const Paragraph = styled.p({
  display: 'inline-block',
  width: '100%',
  whiteSpace: 'pre'
});

const ParagraphContent = styled.span({
  display: 'inline-block',
  height: '100%'
});

function Text(props: { children?: string }) {
  return (
    <Paragraph>
      <ParagraphContent>{props.children}</ParagraphContent>
    </Paragraph>
  );
}

interface Props {}

export function Writer(props: Props) {
  const editor = useRef<HTMLPreElement>(null);
  const [text, setText] = useState<string>('');

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Editor
        ref={editor}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onPaste={(e) => {
          const clipboardData = e.clipboardData.getData('text/plain');
          document.execCommand('insertText', false, clipboardData);
          e.preventDefault();
        }}
        onKeyDown={(e) => {
          if (e.key === 'Backspace') {
            if (editor.current?.firstChild?.firstChild) {
              const selection = window.getSelection();
              const firstText = editor.current.firstChild.firstChild.textContent;
              if (firstText !== null) {
                if (firstText === selection?.toString() || firstText?.length <= 1) {
                  setText('');
                  editor.current.firstChild.firstChild.textContent = '';
                  e.preventDefault();
                }
              }
            }
          }
        }}
        onInput={() => {
          if (editor.current !== null) {
            setText(editor.current.innerText.replaceAll('\n\n', '  \n').replaceAll('\n  \n', '\n&#8203;  \n').replaceAll('\n\n', '\n'));
          }
        }}
      >
        <Text></Text>
      </Editor>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <ReactMarkdown children={text}></ReactMarkdown>
      </div>
    </div>
  );
}
