import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  position: 'fixed',
  top: '0',
  left: '0',
  bottom: '0',
  right: '0',
  width: '100vw',
  height: '100vh',
  backgroundColor: theme[props.themeMode].loadingBackground,
  justifyContent: 'center',
  alignItems: 'center'
}));

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
    display: 'flex',
    width: '1.5rem',
    marginRight: '.25rem',
    justifyContent: 'center'
  },
  css`
    animation: ${RotateAnimation} 0.75s linear infinite;
  `
);

export function Loading() {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Container themeMode={themeMode}>
      <RotatingIcon>
        <i className='fas fa-spinner'></i>
      </RotatingIcon>
      <p>
        <b>Loading...</b>
      </p>
    </Container>
  );
}
