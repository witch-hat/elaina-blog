import React from 'react';
import styled from 'styled-components';
import { MenuButton } from './component/MenuButton';
import { Writer } from './component/Writer';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  backgroundColor: '#ffffff'
});

export default function Admin() {
  return (
    <Container>
      {/* <MenuButton isActive={true} desc={'D'}></MenuButton> */}
      <Writer></Writer>
    </Container>
  );
}
