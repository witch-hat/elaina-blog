import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStickyNote, faBook, faUser, faEdit, faFeatherAlt } from '@fortawesome/free-solid-svg-icons';

import { Lang, trans } from 'src/resources/languages';
import { CircleRippleButton } from 'src/components/common/button/CircleRippleButton';

import { NavigationButton } from './NavigationButton';
import { CircleRippleA } from 'src/components/common/button/CircleRippleA';

const Container = styled.nav((props) => ({
  display: 'flex',
  width: '100%',
  backgroundColor: props.theme.mainBackground,
  borderBottom: `1px solid ${props.theme.borderColor}`,
  alignItems: 'center',
  zIndex: 2
}));

const NavigationContainer = styled.div({
  display: 'flex'
});

const NavigationOptionButtonContainer = styled.div({
  display: 'flex',
  flex: 1,
  marginRight: '0.25rem',
  justifyContent: 'flex-end'
});

const NavName = styled.span({
  fontSize: '1.1rem',
  fontWeight: 'bold'
});

interface Props {
  tab: string;
  isLogin: boolean;
}

export function Navigation(props: Props) {
  function NavigationOptionButton() {
    switch (props.tab) {
      case 'category':
        return (
          <CircleRippleA href={'/admin/category'}>
            <FontAwesomeIcon icon={faEdit} />
          </CircleRippleA>
        );
      case 'about':
        return null;
      default:
        return (
          <CircleRippleA href={'/admin/writer'}>
            <FontAwesomeIcon icon={faFeatherAlt} />
          </CircleRippleA>
        );
    }
  }

  return (
    <Container>
      <NavigationContainer>
        <NavigationButton href='/'>
          <FontAwesomeIcon icon={faStickyNote} style={{ marginRight: '.5rem' }} />
          <NavName>{trans(Lang.LatestPost)}</NavName>
        </NavigationButton>
        <NavigationButton query='category'>
          <FontAwesomeIcon icon={faBook} style={{ marginRight: '.5rem' }} />
          <NavName>{trans(Lang.Category)}</NavName>
        </NavigationButton>
        <NavigationButton query='about'>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '.5rem' }} />
          <NavName>{trans(Lang.About)}</NavName>
        </NavigationButton>
      </NavigationContainer>
      {props.isLogin && (
        <NavigationOptionButtonContainer>
          <NavigationOptionButton />
        </NavigationOptionButtonContainer>
      )}
    </Container>
  );
}
