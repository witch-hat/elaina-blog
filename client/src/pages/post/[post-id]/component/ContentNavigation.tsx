import React from 'react';
import styled from 'styled-components';

const Container = styled.nav({
  display: 'flex',
  position: 'sticky',
  top: 'calc(5rem + 20px)',
  padding: '.5rem',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '250px',
  height: 'calc(100vh - 5rem - 20px)',
  overFlowY: 'auto',
  '&::-webkit-scrollbar': {
    width: '0'
  },
  '@media screen and (max-width: 1380px)': {
    display: 'none',
    opacity: 0
  }
});

const NavigationContainer = styled.div({
  width: '100%',
  padding: '.5rem',
  fontSize: '.875rem',
  color: '#777',
  boxShadow: 'inset 3px 0px #aaaaaa;'
});

export function ContentNavigation() {
  return (
    <Container>
      <NavigationContainer>
        H1(#)
        <br />
        &nbsp;&nbsp;H2(##)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;H3(###)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H4(####)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H5(#####)
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;H6(######)
      </NavigationContainer>
    </Container>
  );
}
