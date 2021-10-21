import React, { useState } from 'react';
import styled from 'styled-components';
import { PageHeader } from './PageHeader';

import { AdminSideBar } from './sidebar/AdminSideBar';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  padding: '.5rem 0',
  justifyContent: 'center'
});

const Section = styled.section({
  width: '850px',
  marginLeft: '50px',
  '@media screen and (max-width: 1380px)': {
    width: '100%',
    padding: '.5rem',
    marginLeft: '0'
  }
});

interface Props {
  title: string;
  children: JSX.Element;
}

export function AdminPageLayout(props: Props) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  function openMenu() {
    setSidebarVisible(true);
  }

  function closeMenu() {
    setSidebarVisible(false);
  }

  return (
    <Container>
      <AdminSideBar visible={sidebarVisible} closeMenu={closeMenu} />
      <Section>
        <PageHeader title={props.title} onMenuButtonClick={openMenu} />
        {props.children}
      </Section>
    </Container>
  );
}
