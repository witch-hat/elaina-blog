import React from 'react';
import styled from 'styled-components';

const Container = styled.div({
  width: '100%',
  minHeight: 'calc(100vh - 5rem - 20px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export function Loading() {
  return (
    <Container>
      <p>Loading</p>
    </Container>
  );
}
