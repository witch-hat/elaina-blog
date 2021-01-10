import React from 'react';
import styled from 'styled-components';

import { ContentCategoryModifier } from './ContentCategoryModifier';
import { ViewCountAnalyst } from './ViewCountAnalyst';
import { SideBar } from './SideBar';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const Side = styled.aside({
  width: '300px',
  height: '100%'
});

const Section = styled.section({
  width: '850px',
  marginLeft: '50px'
});

export function AdminMainPage() {
  return (
    <Container>
      <Side>
        <SideBar />
      </Side>
      <Section>
        <ViewCountAnalyst />
        <ContentCategoryModifier />
      </Section>
    </Container>
  );
}
