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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { trans, Lang } from 'src/resources/languages';

const Container = styled.div({
  position: 'relative'
});

const Button = styled.div<{ themeMode: ThemeMode }>((props) => ({
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

const RotateIcon = styled.span<{ isOpen: boolean }>((props) => {
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
  borderRadius: '10px',
  backgroundColor: theme[props.themeMode].secondaryContentBackground,
  zIndex: 1,
  boxShadow: '0 6px 3px -3px rgba(38,38,38,.2)'
}));

const MenuItem = styled.a<{ themeMode: ThemeMode }>((props) => {
  return {
    padding: '.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    '&:hover': {
      backgroundColor: theme[props.themeMode].hoverBackground
    }
  };
});

interface Props {
  isLogin: boolean;
}

export default function AdminMenuButton(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logout] = useMutation(LOGOUT, {
    onCompleted: (data: any) => {
      setIsMenuOpen(false);
      window.location.reload();
    }
  });

  return (
    <Container>
      <Button onClick={() => setIsMenuOpen(!isMenuOpen)} themeMode={themeMode}>
        {trans(Lang.Menu)}&nbsp;
        <RotateIcon isOpen={isMenuOpen}>
          <FontAwesomeIcon icon={faCaretDown} />
        </RotateIcon>
      </Button>
      {isMenuOpen && (
        <FocusWrapper visible={isMenuOpen} onClickOutside={() => setIsMenuOpen(false)}>
          <ListContainer themeMode={themeMode}>
            <Link href='/admin'>
              <MenuItem themeMode={themeMode} onClick={() => setIsMenuOpen(false)}>
                {trans(Lang.Admin)}
              </MenuItem>
            </Link>
            {props.isLogin ? (
              <MenuItem
                themeMode={themeMode}
                onClick={() => {
                  logout();
                }}
              >
                {trans(Lang.Logout)}
              </MenuItem>
            ) : (
              <Link href='/admin/login'>
                <MenuItem themeMode={themeMode} onClick={() => setIsMenuOpen(false)}>
                  {trans(Lang.Login)}
                </MenuItem>
              </Link>
            )}
          </ListContainer>
        </FocusWrapper>
      )}
    </Container>
  );
}
