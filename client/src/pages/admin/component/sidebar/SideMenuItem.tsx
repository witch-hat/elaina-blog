import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const MenuContainer = styled.div({
  width: '100%',
  padding: '.25rem'
});

const Menu = styled.p({
  width: '100%',
  listStyle: 'none',
  paddingLeft: '1rem',
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
  if (props.href) {
    return (
      <Link href={props.href}>
        <a>
          <MenuContainer>
            <Menu>{props.menu}</Menu>
          </MenuContainer>
        </a>
      </Link>
    );
  } else {
    return (
      <MenuContainer>
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
