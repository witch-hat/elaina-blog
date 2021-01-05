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
  wordBreak: 'break-all',
  outline: 'none',
  padding: '.5rem',
  border: '1px solid #888',
  borderRadius: '12px'
});

const Paragraph = styled.p({
  display: 'inline-block',
  width: '100%',
  wordBreak: 'keep-all'
});

const ParagraphContent = styled.span({
  display: 'inline-block',
  height: '100%'
});

function Text(props: { children?: string }) {
  return (
    <Paragraph>
      <ParagraphContent>{props.children !== undefined ? props.children : <br></br>}</ParagraphContent>
    </Paragraph>
  );
}

class Timer {
  public static instance = new Timer();
  public isTimeout!: boolean;
  private readonly interval: number;
  private timeout!: number;

  constructor() {
    this.interval = 1000;
  }

  start() {
    this.timeout = setTimeout(() => {
      this.isTimeout = true;
    }, this.interval);
  }

  reset() {
    this.isTimeout = false;
    clearTimeout(this.timeout);
  }
}

interface Props {}

export function Writer(props: Props) {
  const history = new Array<string>();
  const editor = useRef<HTMLDivElement>(null);
  const [firstP, setFirstP] = useState<Node>();
  const [initilizedP, setInitilizedP] = useState<Node>();
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (editor.current?.firstChild) {
      setFirstP(editor.current.firstChild);
      setInitilizedP(editor.current.firstChild.cloneNode(true));
    }
  }, []);

  useEffect(() => {
    if (firstP?.firstChild?.nodeName === 'BR') {
      const span = initilizedP?.firstChild?.cloneNode(true);
      while (firstP.hasChildNodes()) {
        firstP.removeChild(firstP.firstChild);
      }
      firstP.appendChild(span);
    }
  }, [firstP?.firstChild]);

  function paste(e: React.ClipboardEvent<HTMLDivElement>) {
    // e.preventDefault();
    // const clipboardData = e.clipboardData.getData('text/plain');
    // const splitedData = clipboardData.split('\n');
    // const selection: Selection = window.getSelection();
    // const isOncePaste: boolean = splitedData.length === 1 ? true : false;
    // const selectionRange: Range = selection?.getRangeAt(0);
    // const anchorNode: Node = selection.anchorNode;
    // const focusNode: Node = selection.focusNode;
    // let lastEndText: string = '';
    // // 처음부터 붙여넣기 하는 경우 SPAN의 firstChildNode가 없어서 예외처리
    // if (anchorNode?.nodeName === 'SPAN') {
    //   const textNode = document.createTextNode(splitedData[0]);
    //   anchorNode.appendChild(textNode);
    //   selectionRange.setStart(textNode, splitedData[0].length);
    // } else {
    //   const anchorOffset = selection.anchorOffset;
    //   const focusOffset = selection.focusOffset;
    //   const focusText = focusNode?.textContent;
    //   if (anchorNode === focusNode) {
    //     const startOffset = anchorOffset < focusOffset ? anchorOffset : focusOffset;
    //     const endOffset = anchorOffset > focusOffset ? anchorOffset : focusOffset;
    //     const startText = focusText?.slice(0, startOffset);
    //     const endText = focusText?.slice(endOffset, focusText.length);
    //     if (isOncePaste) {
    //       focusNode.textContent = `${startText}${splitedData[0]}${endText}`;
    //       selectionRange.setStart(focusNode, startOffset + splitedData[0].length);
    //     } else {
    //       focusNode.textContent = `${startText}${splitedData[0]}`;
    //       lastEndText = endText;
    //     }
    //   } else {
    //     const editorChildNodes: Array<ChildNode> = [];
    //     let startNode, endNode;
    //     // Selection된 영역의 노드 시작지점 및 끝나는 지점 구하기
    //     for (let editorChildNode of editor.current.childNodes) {
    //       if (startNode) {
    //         editorChildNodes.push(editorChildNode);
    //       }
    //       if (editorChildNode === anchorNode.parentNode.parentNode || editorChildNode === focusNode?.parentNode?.parentNode) {
    //         if (startNode === undefined) {
    //           startNode = editorChildNode;
    //           editorChildNodes.push(editorChildNode);
    //         } else {
    //           endNode = editorChildNode;
    //           break;
    //         }
    //       }
    //     }
    //     let startOffset;
    //     let startText, endText;
    //     if (startNode === anchorNode.parentNode.parentNode) {
    //       startOffset = anchorOffset + splitedData[0].length;
    //       startText = startNode?.firstChild.textContent?.slice(0, anchorOffset);
    //       endText = endNode?.firstChild.textContent?.slice(focusOffset);
    //     } else {
    //       startOffset = focusOffset + splitedData[0].length;
    //       startText = startNode?.firstChild.textContent?.slice(0, focusOffset);
    //       endText = endNode?.firstChild.textContent?.slice(anchorOffset);
    //     }
    //     for (let editorChildNode of editorChildNodes) {
    //       if (editorChildNode !== startNode) {
    //         editorChildNode.remove();
    //       }
    //     }
    //     console.log(startNode);
    //     if (isOncePaste) {
    //       startNode.firstChild.textContent = `${startText}${splitedData[0]}${endText}`;
    //       selectionRange?.setStart(startNode.firstChild.firstChild, startOffset);
    //       selectionRange?.setEnd(startNode.firstChild.firstChild, startOffset);
    //     } else {
    //       lastEndText = endText;
    //       startNode.firstChild.textContent = `${startText}${splitedData[0]}`;
    //     }
    //   }
    // }
    // let focusNextNode: ChildNode;
    // if (focusNode?.nodeName === 'SPAN') {
    //   focusNextNode = focusNode?.parentNode?.nextSibling;
    // } else {
    //   focusNextNode = focusNode?.parentNode?.parentNode?.nextSibling;
    // }
    // for (let index = 1; index < splitedData.length; index++) {
    //   const targetData = splitedData[index];
    //   console.log(targetData);
    //   const textNode: Node = initilizedP.cloneNode(true);
    //   if (index === splitedData.length - 1) {
    //     textNode.firstChild.textContent = `${targetData}${lastEndText}`;
    //   } else {
    //     textNode.firstChild.textContent = targetData;
    //   }
    //   editor.current.insertBefore(textNode, focusNextNode);
    //   if (index === splitedData.length - 1 && textNode?.firstChild?.firstChild) {
    //     selectionRange.setStart(textNode?.firstChild?.firstChild, targetData.length);
    //   } else {
    //     focusNextNode = textNode?.nextSibling;
    //   }
    // }
    // parseTextContent();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === 'Backspace') {
      if (editor.current?.childElementCount === 1 && editor.current?.textContent?.length === 0) {
        e.preventDefault();
      }
    }
  }

  function parseTextContent() {
    if (editor.current !== null) {
      setText(editor.current.innerText.replaceAll('\n\n', '  \n').replaceAll('\n  \n', '\n&#8203;  \n').replaceAll('\n\n', '\n'));
    }
  }

  function findParentNodeByNodeName(node: Node | null, nodeName: string): Node | null {
    if (node?.nodeName === nodeName) {
      return node;
    } else {
      return findParentNodeByNodeName(node.parentNode, nodeName);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <Editor
        ref={editor}
        contentEditable={true}
        suppressContentEditableWarning={true}
        onPaste={paste}
        onKeyDown={handleKeyDown}
        // onKeyDown={(e) => {
        //   // console.log('down', e.key);
        // }}
        onKeyUp={(e) => {
          // console.log('up', e.key);
        }}
        onKeyPress={(e) => {
          // console.log('press', e.key);
        }}
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
