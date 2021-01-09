import React from 'react';
import styled from 'styled-components';

import { MenuButton } from './MenuButton';
import { FormatBoldBlack } from 'src/resources/svg/FormatBoldBlack';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '3rem',
  alignItems: 'center',
  userSelect: 'none',
  padding: '.4rem 0'
});

interface Props {}

export const Menu = React.forwardRef((props: Props, ref: React.RefObject<HTMLDivElement>) => {
  const selection: Selection = window.getSelection();

  function findNodeWithNodeName(startNode: Node, name: string): Node {
    if (startNode.nodeName === name) {
      return startNode;
    } else {
      return findNodeWithNodeName(startNode.parentNode, name);
    }
  }

  function insertMarkdownStartAndEnd(startMarkdown: string, endMarkdown: string = startMarkdown) {
    const selectionRange = selection.getRangeAt(0);

    if (selection.anchorNode === selection.focusNode) {
      if (selection.anchorOffset <= selection.focusOffset) {
        const newText =
          selection.anchorNode?.textContent?.slice(0, selection.anchorOffset) +
          startMarkdown +
          selection.anchorNode?.textContent?.slice(selection.anchorOffset, selection.focusOffset) +
          endMarkdown +
          selection.anchorNode?.textContent?.slice(selection.focusOffset);

        selection.anchorNode.textContent = newText;
        ref.current?.focus();
        // selectionRange.setStart(selection.anchorNode, selection.anchorOffset + startMarkdown.length);
      } else {
        const newText =
          selection.anchorNode?.textContent?.slice(0, selection.focusOffset) +
          startMarkdown +
          selection.anchorNode?.textContent?.slice(selection.focusOffset, selection.anchorOffset) +
          endMarkdown +
          selection.anchorNode?.textContent?.slice(selection.anchorOffset);

        selection.anchorNode.textContent = newText;
        ref.current?.focus();
        // selectionRange.setStart(selection.anchorNode, selection.anchorOffset + startMarkdown.length);
      }
    } else {
      const newAnchorText =
        selection.anchorNode?.textContent?.slice(0, selection.anchorOffset) +
        startMarkdown +
        selection.anchorNode?.textContent?.slice(selection.anchorOffset);
      const newFocusText =
        selection.focusNode?.textContent?.slice(0, selection.focusOffset) +
        endMarkdown +
        selection.focusNode?.textContent?.slice(selection.focusOffset);

      selection.anchorNode.textContent = newAnchorText;
      selection.focusNode.textContent = newFocusText;
      ref.current?.focus();
    }
    console.log(selection.anchorNode?.parentNode?.parentNode);
  }

  function insertMarkdownLineStart(markdown: string) {
    const NODE = 1;
    const list = findNodeWithNodeName(selection.anchorNode, 'DIV').childNodes;
    const anchorParagraph = findNodeWithNodeName(selection.anchorNode, 'P');
    const focusParagraph = findNodeWithNodeName(selection.focusNode, 'P');
    let insertFlag: boolean = false;
    for (const child of list.entries()) {
      if (anchorParagraph.isSameNode(child[NODE])) {
        insertFlag = true;
      } else if (focusParagraph.isSameNode(child[NODE])) {
        focusParagraph.textContent = markdown + focusParagraph.textContent;
        break;
      }

      if (insertFlag) child[NODE].textContent = markdown + child[NODE].textContent;
    }
    ref.current?.focus();
  }

  return (
    <Container contentEditable={false}>
      <MenuButton isActive desc='Bold' onClick={() => insertMarkdownStartAndEnd('**')}>
        {/* <FormatBoldBlack /> */}
        <i className='fas fa-bold'></i>
      </MenuButton>
      <MenuButton isActive desc='Italic' onClick={() => insertMarkdownStartAndEnd('*')}>
        <i className='fas fa-italic'></i>
      </MenuButton>
      <MenuButton isActive desc='Color' onClick={() => insertMarkdownStartAndEnd("<span style='color:#ccc'>", '</span>')}>
        <i className='fas fa-font'></i>
      </MenuButton>
      <MenuButton isActive desc='Code Block' onClick={() => insertMarkdownStartAndEnd('\n```\n')}>
        <i className='fas fa-code'></i>
      </MenuButton>
      <MenuButton isActive desc='List' onClick={() => insertMarkdownLineStart('* ')}>
        <i className='fas fa-list-ul'></i>
      </MenuButton>
      <MenuButton isActive desc='Quote' onClick={() => insertMarkdownLineStart('> ')}>
        <i className='fas fa-quote-left'></i>
      </MenuButton>
      <MenuButton isActive desc='Upload Image' onClick={() => {}}>
        <i className='far fa-images'></i>
      </MenuButton>
    </Container>
  );
});
