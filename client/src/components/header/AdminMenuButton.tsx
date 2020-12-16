import { useState } from 'react';
import styled from 'styled-components';

const Button = styled.div({
  flexShrink: 0,
  cursor: 'pointer',
  padding: '.5rem',
  margin: '0 10px',
  borderRadius: '8px',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: '#eee'
  }
});

const RotateIcon = styled.i<{ isOpen: boolean }>((props) => {
  return {
    display: 'inline-block',
    transition: '.3s all',
    transform: props.isOpen ? 'rotate(180deg)' : 'none'
  };
});

interface Props {}

export default function AdminMenuButton() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  console.log(isMenuOpen);

  return (
    <Button onClick={() => setIsMenuOpen(!isMenuOpen)}>
      Menu&nbsp;
      <RotateIcon className='fas fa-caret-down' isOpen={isMenuOpen} />
    </Button>
  );
}
