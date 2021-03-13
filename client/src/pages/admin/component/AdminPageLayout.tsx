import React from 'react';
import styled from 'styled-components';

import { SideBar } from './SideBar';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
});

const Side = styled.aside({
  width: '300px',
  height: '100%'
});

const Section = styled.section({
  width: '850px',
  marginLeft: '50px'
});

interface Props {
  children: JSX.Element;
}

export function AdminPageLayout(props: Props) {
  return (
    <Container>
      <Side>
        <SideBar />
      </Side>
      <Section>{props.children}</Section>
    </Container>
  );
}
