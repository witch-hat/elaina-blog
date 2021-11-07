import { useRef } from 'react';
import styled from 'styled-components';

const Button = styled.span({
  width: 'max-content',
  height: 'max-content'
});

interface SubmitButtonProps {
  blockedFunction: () => any;
  waitTime?: number;
  children?: JSX.Element;
}

export function SubmitButton(props: SubmitButtonProps) {
  const running = useRef(false);

  async function onClick() {
    running.current = true;
    await props.blockedFunction();
    running.current = false;
  }

  return (
    <Button
      onClick={() => {
        if (!running.current) onClick();
      }}
    >
      {props.children}
    </Button>
  );
}