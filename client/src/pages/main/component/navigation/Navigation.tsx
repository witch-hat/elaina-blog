import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUser } from '@fortawesome/free-solid-svg-icons';

import { Lang, trans } from 'src/resources/languages';

import { NavigationButton } from './NavigationButton';

const Container = styled.nav({
  display: 'flex',
  width: '100%',
  alignItems: 'center'
});

const NavName = styled.span({
  fontSize: '1.1rem',
  fontWeight: 'bold'
});

interface Props {}

export function Navigation(props: Props) {
  return (
    <Container>
      <NavigationButton href='/'>
        <>
          <FontAwesomeIcon icon={faBook} style={{ marginRight: '.5rem' }} />
          <NavName>{trans(Lang.Board)}</NavName>
        </>
      </NavigationButton>
      {/* <NavigationButton href='?tab=timeline'>
        <>
          <NavigationIcon icon={faStream} />
          <NavName>{trans(Lang.TimeLine)}</NavName>
        </>
      </NavigationButton> */}
      <NavigationButton query='about'>
        <>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '.5rem' }} />
          <NavName>{trans(Lang.About)}</NavName>
        </>
      </NavigationButton>
    </Container>
  );
}
