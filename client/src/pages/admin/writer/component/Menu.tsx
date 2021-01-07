import React from 'react';
import styled from 'styled-components';

import { MenuButton } from './MenuButton';
import { FormatBoldBlack } from 'src/resources/svg/FormatBoldBlack';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '3rem',
  backgroundColor: '#eee',
  alignItems: 'center',
  position: 'absolute',
  top: '0',
  left: '0',
  right: '0',
  userSelect: 'none',
  padding: '.4rem'
});

interface Props {}

export function Menu(props: Props) {
  const selection: Selection = window.getSelection();
  const selectionRange: Range = selection.getRangeAt(0);

  console.log(selection.anchorOffset, selection.focusOffset);

  function insertMarkdownStartAndEnd(text: string, markdown: string) {

  }

  function insertMarkdownLineStart(text: string, markdown: string) {

  }

  return (
    <Container contentEditable={false}>
      <MenuButton isActive desc='Bold' onClick={() => console.log(selection.anchorNode?.textContent, selection.focusOffset, selection)}>
        <FormatBoldBlack />
      </MenuButton>
      <MenuButton isActive desc='Italic' onClick={() => console.log(selection.anchorNode?.textContent, selection.focusOffset, selection)}>
        <span>
          <i>Ɪ</i>
        </span>
      </MenuButton>
      <MenuButton isActive desc='Code Block' onClick={() => console.log(selection.anchorNode?.textContent, selection.focusOffset, selection)}>
        <span>&lt;&nbsp;&gt;</span>
      </MenuButton>
      <MenuButton isActive desc='List' onClick={() => console.log(selection.anchorNode?.textContent, selection.focusOffset, selection)}>
        <span>*</span>
      </MenuButton>
      <MenuButton isActive desc='Quote' onClick={() => console.log(selection.anchorNode?.textContent, selection.focusOffset, selection)}>
        <span>></span>
      </MenuButton>
    </Container>
  );
}
