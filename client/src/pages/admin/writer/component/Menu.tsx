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

  console.log(selection.anchorOffset, selection.focusOffset);

  function insertMarkdownStartAndEnd(text: string, markdown: string) {}

  function insertMarkdownLineStart(text: string, markdown: string) {}

  return (
    <Container contentEditable={false}>
      <MenuButton isActive desc='Bold' onClick={() => {}}>
        {/* <FormatBoldBlack /> */}
        <i className='fas fa-bold'></i>
      </MenuButton>
      <MenuButton isActive desc='Italic' onClick={() => {}}>
        <span>
          <i className='fas fa-italic'></i>
        </span>
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
    </Container>
  );
}
