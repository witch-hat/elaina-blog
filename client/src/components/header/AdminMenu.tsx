import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { trans, Lang } from 'src/resources/languages';

import { LOGOUT } from 'src/query/user';
import { DropDownMenu } from '../common/box/DropDownMenu';

const AdminDropDown = styled.div({});

const MenuItem = styled.a<{ themeMode: ThemeMode }>((props) => {
  return {
    padding: '.5rem',
    borderRadius: '.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    wordBreak: 'keep-all',
    '&:hover': {
      backgroundColor: theme[props.themeMode].hoverBackground
    }
  };
});

const RotateIcon = styled.span<{ isOpen: boolean }>((props) => {
  return {
    display: 'inline-block',
    marginLeft: '.4rem',
    transition: '.3s all',
    transform: props.isOpen ? 'rotate(180deg)' : 'none'
  };
});

interface Props {
  isLogin: boolean;
}

export function AdminMenu(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const router = useRouter();
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      router.reload();
    }
  });

  return (
    <AdminDropDown>
      <DropDownMenu
        visible={isAdminMenuOpen}
        mainButton={
          <>
            {trans(Lang.Menu)}
            <RotateIcon isOpen={isAdminMenuOpen}>
              <FontAwesomeIcon icon={faCaretDown} />
            </RotateIcon>
          </>
        }
        setVisible={setIsAdminMenuOpen}
        dropMenu={
          <>
            <Link href='/admin'>
              <MenuItem themeMode={themeMode} onClick={() => setIsAdminMenuOpen(false)}>
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
                <MenuItem themeMode={themeMode} onClick={() => setIsAdminMenuOpen(false)}>
                  {trans(Lang.Login)}
                </MenuItem>
              </Link>
            )}
          </>
        }
      />
    </AdminDropDown>
  );
}
