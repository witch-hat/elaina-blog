import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { theme } from 'src/styles';
import { FocusWrapper } from 'src/components';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { LOGOUT } from 'src/query/user';

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

interface Props {
  isLogin: boolean;
}

export default function AdminMenuButton(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logout] = useMutation(LOGOUT);

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
              <List onClick={() => setIsMenuOpen(false)}>Admin</List>
            </Link>
            {props.isLogin ? (
              <List
                onClick={() => {
                  setIsMenuOpen(false);
                  logout({
                    variables: {
                      emailId: ''
                    }
                  });
                  router.push('/');
                }}
              >
                Logout
              </List>
            ) : (
              <Link href='/admin/login'>
                <List onClick={() => setIsMenuOpen(false)}>Login</List>
              </Link>
            )}
          </ListContainer>
        </FocusWrapper>
      )}
    </Container>
  );
}
