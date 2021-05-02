import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsersCog, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { Lang, trans } from 'src/resources/languages';

import { LOGOUT } from '../../../query/user';

interface Props {}

const Container = styled.div({
  width: '100%'
});

const MenuTitle = styled.p({
  width: '100%',
  fontSize: '1.25rem',
  fontWeight: 'bold'
});

const MenuItem = styled.li({
  width: '100%',
  listStyle: 'none',
  paddingLeft: '1rem',
  cursor: 'pointer',
  margin: '.125rem 0',
  '&:hover': {
    textDecoration: 'underline'
  }
});

const MenuContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '.1rem'
});

const Button = styled.button({
  width: '100%',
  padding: '.625rem',
  borderRadius: '.5rem',
  marginBottom: '1rem'
});

interface SideBarIconProps {
  icon: IconProp;
}

function SideBarIcon(props: SideBarIconProps) {
  return <FontAwesomeIcon icon={props.icon} style={{ marginRight: '8px' }} />;
}

interface Props {
  cookie?: any;
}

export function SideBar(props: Props) {
  const router = useRouter();

  const [logout] = useMutation(LOGOUT);

  return (
    <Container>
      <Link href='/admin/writer'>
        <Button>{trans(Lang.Write)}</Button>
      </Link>
      <MenuContainer>
        <SideBarIcon icon={faBookmark} />
        <MenuTitle>{trans(Lang.Content)}</MenuTitle>
      </MenuContainer>
      <MenuContainer>
        <Link href='/admin/category' passHref>
          <MenuItem>{trans(Lang.CategoryManage)}</MenuItem>
        </Link>
      </MenuContainer>


      <MenuContainer>
      <Link href='/admin/posts' passHref>
        <a>
        <MenuItem>{trans(Lang.BoardManage)}</MenuItem>
        </a>
      </Link>
      </MenuContainer>


      <MenuContainer>
        <MenuItem>{trans(Lang.CommentManage)}</MenuItem>
      </MenuContainer>


      <MenuContainer>
        <SideBarIcon icon={faUsersCog} />
        <MenuTitle>{trans(Lang.Setting)}</MenuTitle>
      </MenuContainer>
      <MenuContainer>
        <MenuItem
          onClick={() => {
            logout();
            router.push('/admin/login');
          }}
        >
          {trans(Lang.Logout)}
        </MenuItem>
      </MenuContainer>
    </Container>
  );
}
