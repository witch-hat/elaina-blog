import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const MenuContainer = styled.nav<{ currentNav: boolean; themeMode: ThemeMode }>((props) => ({
  width: '100%',
  padding: '.5rem',
  borderLeft: props.currentNav ? '2px solid #867dff' : 'none',
  borderBottom: `1px solid ${theme[props.themeMode].borderColor}`,
  cursor: 'pointer',
  listStyle: 'none',
  fontWeight: props.currentNav ? 'bold' : 'normal',
  color: props.currentNav ? '#867dff' : 'inherit',
  textDecoration: props.currentNav ? 'underline' : 'none',
  transition: '.2s all',
  userSelect: 'none',
  '&:hover': {
    color: theme[props.themeMode].mainText,
    marginLeft: '.35rem',
    borderLeft: `2px solid ${theme[props.themeMode].hoverBorderColor}`,
    fontWeight: 'bolder',
    textDecoration: 'underline'
  }
}));

const Menu = styled.p({
  width: '100%',
  listStyle: 'none',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  }
});

interface Props {
  menu: string;
  href?: string;
  onClick?: Function;
}

export function SideMenuItem(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const router = useRouter();

  if (props.href) {
    return (
      <MenuContainer currentNav={router.pathname === props.href} themeMode={themeMode}>
        <Link href={props.href}>
          <a>
            <Menu>{props.menu}</Menu>
          </a>
        </Link>
      </MenuContainer>
    );
  } else {
    return (
      <MenuContainer currentNav={false} themeMode={themeMode}>
        <Menu
          onClick={() => {
            if (props.onClick) {
              props.onClick();
            }
          }}
        >
          {props.menu}
        </Menu>
      </MenuContainer>
    );
  }
}
