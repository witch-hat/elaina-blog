import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const GoingDown = keyframes({
  from: {
    transform: 'translateY(-1rem)'
  },
  to: {
    transform: 'translateY(0)'
  }
});

const Container = styled.div<{ isError: boolean }>(
  (props) => ({
    position: 'fixed',
    width: '100vw',
    top: '4rem',
    left: '0',
    right: '0',
    backgroundColor: props.isError ? 'rgb(224, 103, 103)' : 'rgb(111, 178, 237)',
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem',
    justifyContent: 'space-between'
  }),
  css`
    animation: ${GoingDown} 0.3s forwards;
  `
);

const MessageContainer = styled.div({
  fontSize: '.9rem'
});

const Message = styled.p({
  padding: '0 2rem'
});

const CloseButton = styled.button({
  padding: '.5rem',
  marginRight: '2.5rem',
  border: 'none',
  outline: 'none'
});

interface Props {
  msg: string;
  isError: boolean;
  onCloseButtonClick: Function;
}

export function AlertBox(props: Props) {
  return (
    <Container isError={props.isError}>
      <MessageContainer>
        <Message>{props.msg}</Message>
      </MessageContainer>
      <CloseButton onClick={() => props.onCloseButtonClick()}>X</CloseButton>
    </Container>
  );
}
