import React, { createElement, useEffect, useRef } from 'react';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { createNode } from 'typescript';
import styles from 'src/styles/MarkdownStyles.module.css';
const gfm = require('remark-gfm');

const Editor = styled.pre({
  display: 'flex',
  flexDirection: 'column',
  width: '500px',
  fontFamily: "'Nanum Gothic', sans-serif",
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-all',
  outline: 'none',
  padding: '.5rem',
  border: '1px solid #888',
  borderRadius: '12px'
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
  },
  '&:empty:focus::before': {
    content: "''"
  }
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
  const [tagText, setTagText] = useState<string>('');
  const [initlizedP, setInitilizedP] = useState<Node>();
  const [initilizeSpan, setInitilizeSpan] = useState<Node>();
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (editor.current?.firstChild?.firstChild) {
      setTagText(editor.current.firstElementChild?.outerHTML);
      setInitilizedP(editor.current.firstChild);
      setInitilizeSpan(editor.current.firstChild.firstChild);
    }
  }, []);

  useEffect(() => {
    if (editor.current?.firstChild?.firstChild?.nodeName === 'BR') {
      if (initilizeSpan) {
        editor.current?.firstChild?.firstChild.remove();
        initilizeSpan.textContent = '';
        editor.current?.firstChild?.appendChild(initilizeSpan);
      }
    }
  }, [editor.current?.firstChild?.firstChild]);

  function paste(e: React.ClipboardEvent<HTMLPreElement>) {
    e.preventDefault();

    const clipboardData = e.clipboardData.getData('text/plain');
    const splitedData = clipboardData.split('\n');
    console.log(splitedData);

    const selection = window.getSelection()?.getRangeAt(0);

    const node = initlizedP?.cloneNode(true);
    node.textContent = splitedData[0];

    editor.current?.insertBefore(node, null);

    console.log(selection?.commonAncestorContainer.parentNode?.parentNode);

    // console.log(selection?.getRangeAt(0));
    // console.log(selection?.getRangeAt(0).commonAncestorContainer.parentElement?.parentElement);
    // selection?.getRangeAt(0).commonAncestorContainer.parentNode?.parentElement?.insertBefore()

    // document.execCommand('insertHTML', false, `<a>${splitedData[0]}</a>`);

    // for (let text of splitedData) {
    //   if (text === splitedData[0]) {
    //     document.execCommand('insertHTML', false, '<span>span</span>');
    //   } else {
    //     const parent = window.getSelection()?.focusNode?.parentNode?.parentNode?.parentElement;
    //     // parent.focus();
    //     console.log(parent);
    //     document.execCommand('insertHTML', false, '<div>div</div>');
    //   }

    // e.preventDefault();
    // const parent = window.getSelection()?.focusNode?.parentNode?.parentElement;
    // console.log(parent);
    // parent?.focus();
    // const p = tagText.replace('></span>', `>${text}</span>`);
    // console.log(p);
    // document.execCommand('insertHTML', false, p);

    // const clonedNode = initlizedP?.cloneNode(true);
    // if (clonedNode) {
    //   if (text === '') {
    //     clonedNode.textContent = '  \n';
    //   } else {
    //     clonedNode.textContent = text;
    //   }

    //   const parent = window.getSelection()?.focusNode?.parentNode?.parentNode;
    //   parent?.append(clonedNode);

    //   e.preventDefault();
    // }
  }

  function keyDown(e: React.KeyboardEvent<HTMLPreElement>) {
    if (e.key === 'Backspace') {
      if (text.length <= 1) {
        if (editor.current?.firstChild?.firstChild) {
          setText('');
          editor.current.firstChild.firstChild.textContent = '';
          e.preventDefault();
        }
      }
    }
  }

  function parseTextContent() {
    if (editor.current !== null) {
      setText(editor.current.innerText.replaceAll('\n\n', '  \n').replaceAll('\n  \n', '\n&#8203;  \n').replaceAll('\n\n', '\n'));
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Editor
        ref={editor}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onPaste={paste}
        onKeyDown={keyDown}
        onInput={parseTextContent}
      >
        <Text></Text>
      </Editor>
      <div style={{ marginLeft: '2rem', display: 'flex', flexDirection: 'column' }}>
        <ReactMarkdown plugins={gfm} className={styles['markdown-body']} children={text}></ReactMarkdown>
      </div>
    </div>
  );
}
