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

export function Menu(props: Props) {
  function insertMarkdownStartAndEnd(markdown: string) {
    const selection: Selection = window.getSelection();
    if (selection.anchorNode === selection.focusNode) {
      const newText =
        selection.anchorNode?.textContent?.slice(0, selection.anchorOffset) +
        markdown +
        selection.anchorNode?.textContent?.slice(selection.anchorOffset, selection.focusOffset) +
        markdown +
        selection.anchorNode?.textContent?.slice(selection.focusOffset);

      selection.anchorNode.textContent = newText;
    } else {
      const newAnchorText =
        selection.anchorNode?.textContent?.slice(0, selection.anchorOffset) +
        markdown +
        selection.anchorNode?.textContent?.slice(selection.anchorOffset);
      const newFocusText =
        selection.focusNode?.textContent?.slice(0, selection.focusOffset) +
        markdown +
        selection.focusNode?.textContent?.slice(selection.focusOffset);

      selection.anchorNode.textContent = newAnchorText;
      selection.focusNode.textContent = newFocusText;
    }
  }

  function insertMarkdownLineStart(markdown: string) {}

  return (
    <Container contentEditable={false}>
      <MenuButton isActive desc='Bold' onClick={() => insertMarkdownStartAndEnd('**')}>
        {/* <FormatBoldBlack /> */}
        <i className='fas fa-bold'></i>
      </MenuButton>
      <MenuButton isActive desc='Italic' onClick={() => insertMarkdownStartAndEnd('*')}>
        <i className='fas fa-italic'></i>
      </MenuButton>
      <MenuButton isActive desc='Color' onClick={() => {}}>
        <i className='fas fa-font'></i>
      </MenuButton>
      <MenuButton isActive desc='Code Block' onClick={() => {}}>
        <i className='fas fa-code'></i>
      </MenuButton>
      <MenuButton isActive desc='List' onClick={() => {}}>
        <i className='fas fa-list-ul'></i>
      </MenuButton>
      <MenuButton isActive desc='Quote' onClick={() => {}}>
        <i className='fas fa-quote-left'></i>
      </MenuButton>
      <MenuButton isActive desc='Upload Image' onClick={() => {}}>
        <i className='far fa-images'></i>
      </MenuButton>
    </Container>
  );
}
