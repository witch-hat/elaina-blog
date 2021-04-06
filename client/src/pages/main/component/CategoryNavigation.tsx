import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faStream, faUser } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useSelector } from 'react-redux';

import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { Lang, trans } from 'src/resources/languages';

import NavigationButton from './NavigationButton';

const Container = styled.nav({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
});

const NavName = styled.span({
  fontWeight: 'bold'
});

interface IconProps {
  icon: IconProp;
}

function NavigationIcon(props: IconProps) {
  return <FontAwesomeIcon icon={props.icon} style={{ marginRight: '8px' }} />;
}

interface Props {}

export default function CategoryNavigation(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Container>
      <NavigationButton href='/'>
        <>
          <NavigationIcon icon={faBook} />
          <NavName>{trans(Lang.Board)}</NavName>
        </>
      </NavigationButton>
      <NavigationButton href='/timeline'>
        <>
          <NavigationIcon icon={faStream} />
          <NavName>{trans(Lang.TimeLine)}</NavName>
        </>
      </NavigationButton>
      <NavigationButton href='/about'>
        <>
          <NavigationIcon icon={faUser} />
          <NavName>{trans(Lang.About)}</NavName>
        </>
      </NavigationButton>
    </Container>
  );
}
