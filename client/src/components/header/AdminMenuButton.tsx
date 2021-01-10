import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

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

interface Props {}

export default function AdminMenuButton(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Link href='/admin'>
      <Button onClick={() => setIsMenuOpen(!isMenuOpen)} themeMode={themeMode}>
        Menu&nbsp;
      </Button>
    </Link>
  );
}
