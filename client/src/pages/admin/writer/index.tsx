import React from 'react';
import styled from 'styled-components';

import { MenuButton } from './component/MenuButton';
import { Writer } from './component/Writer';
import { theme } from 'src/styles';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  width: '100%',
  borderRadius: '12px',
  padding: '.5rem'
}));

export default function Admin() {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Container themeMode={themeMode}>
      {/* <MenuButton isActive={true} desc={'D'}></MenuButton> */}
      <Writer />
    </Container>
  );
}
