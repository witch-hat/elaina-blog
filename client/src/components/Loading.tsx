import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const Container = styled.div({
  width: '100%',
  minHeight: 'calc(100vh - 5rem - 20px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const RotateAnimation = keyframes({
  from: {
    transform: 'rotate(0deg)'
  },
  to: {
    transform: 'rotate(360deg)'
  }
});

const RotatingIcon = styled.span(
  {
    width: '1.5rem',
    display: 'flex',
    justifyContent: 'center',
    marginRight: '.25rem'
  },
  css`
    animation: ${RotateAnimation} 0.75s linear infinite;
  `
);

export function Loading() {
  return (
    <Container>
      <RotatingIcon>
        <i className='fas fa-spinner'></i>
      </RotatingIcon>
      <p>
        <b>Loading...</b>
      </p>
    </Container>
  );
}
