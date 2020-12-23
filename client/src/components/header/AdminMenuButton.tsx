import { useState } from 'react';
import styled from 'styled-components';

import { theme } from 'src/styles';

const Button = styled.div<{ themeMode: string }>((props) => ({
  flexShrink: 0,
  cursor: 'pointer',
  padding: '.5rem',
  margin: '0 10px',
  borderRadius: '8px',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: theme[props.themeMode].hoverBackground
  }
}));

const RotateIcon = styled.i<{ isOpen: boolean }>((props) => {
  return {
    display: 'inline-block',
    transition: '.3s all',
    transform: props.isOpen ? 'rotate(180deg)' : 'none'
  };
});

interface Props {
  theme: string;
}

export default function AdminMenuButton(props: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Button onClick={() => setIsMenuOpen(!isMenuOpen)} themeMode={props.theme}>
      Menu&nbsp;
      <RotateIcon className='fas fa-caret-down' isOpen={isMenuOpen} />
    </Button>
  );
}
