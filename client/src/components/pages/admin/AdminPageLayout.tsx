import React from 'react';
import styled from 'styled-components';

import { AdminSideBar } from './sidebar/AdminSideBar';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  padding: '.5rem 0',
  justifyContent: 'center'
});

const Side = styled.aside({
  position: 'sticky',
  top: 'calc(4.5rem + 20px)',
  width: '300px',
  height: 'calc(100vh - 4rem - 20px)'
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
        <AdminSideBar />
      </Side>
      <Section>{props.children}</Section>
    </Container>
  );
}
