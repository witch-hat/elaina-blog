import { useState } from 'react';
import styled from 'styled-components';

import { theme } from 'src/styles';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

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

interface Props {}

export default function AdminMenuButton(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Button onClick={() => setIsMenuOpen(!isMenuOpen)} themeMode={themeMode}>
      Menu&nbsp;
      <RotateIcon className='fas fa-caret-down' isOpen={isMenuOpen} />
    </Button>
  );
}
