import React from 'react';
import styled from 'styled-components';

import { MemoizedAdminSideBar } from './sidebar/AdminSideBar';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center'
});

const Side = styled.aside({
  position: 'sticky',
  width: '300px',
  height: 'calc(100vh - 4rem - 20px)',
  padding: '1rem 0',
  top: 'calc(5rem + 20px)'
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
        <MemoizedAdminSideBar />
      </Side>
      <Section>{props.children}</Section>
    </Container>
  );
}
