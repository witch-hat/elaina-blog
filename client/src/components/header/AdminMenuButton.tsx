import { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { theme } from 'src/styles';
import { FocusWrapper } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div({
  position: 'relative'
});

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

const ListContainer = styled.div<{ themeMode: ThemeMode }>((props) => ({
  position: 'absolute',
  right: '10px',
  top: '.5rem',
  display: 'flex',
  width: '10rem',
  flexDirection: 'column',
  borderRadius: '12px',
  backgroundColor: theme[props.themeMode].secondaryContentBackground,
  zIndex: 1
}));

const List = styled.div({
  padding: '.75rem',
  textAlign: 'center',
  borderRadius: '12px',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#888'
  }
});

interface Props {}

export default function AdminMenuButton(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Container>
      <Button onClick={() => setIsMenuOpen(!isMenuOpen)} themeMode={themeMode}>
        Menu&nbsp;
        <RotateIcon className='fas fa-caret-down' isOpen={isMenuOpen} />
      </Button>
      {isMenuOpen && (
        <FocusWrapper visible={isMenuOpen} onClickOutside={() => setIsMenuOpen(false)}>
          <ListContainer themeMode={themeMode}>
            <Link href='/admin'>
              <List>Admin</List>
            </Link>
            <Link href='/admin'>
              <List>Admin</List>
            </Link>
            <Link href='/admin'>
              <List>Admin</List>
            </Link>
            <Link href='/admin'>
              <List>Admin</List>
            </Link>
            <Link href='/admin'>
              <List>Admin</List>
            </Link>
          </ListContainer>
        </FocusWrapper>
      )}
    </Container>
  );
}
