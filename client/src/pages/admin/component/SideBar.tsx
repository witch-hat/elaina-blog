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

const TitleWrapper = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '.5rem'
});

const Icon = styled.span({
  display: 'inline-flex',
  width: '1.5rem',
  height: '1.5rem',
  justifyContent: 'flex-start',
  alignItems: 'center'
});

const Title = styled.p({
  width: '100%',
  fontSize: '1.25rem',
  fontWeight: 'bold'
});

const ListContainer = styled.ul({
  width: '100%',
  marginTop: '0'
});

const List = styled.li({
  width: '100%',
  listStyle: 'none',
  paddingLeft: '1rem',
  cursor: 'pointer',
  margin: '.125rem 0',
  '&:hover': {
    textDecoration: 'underline'
  }
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
      <TitleWrapper>
        <SideBarIcon icon={faBookmark} />
        <Title>{trans(Lang.Content)}</Title>
      </TitleWrapper>
      <ListContainer>
        <Link href='/admin/category' passHref>
          <a>
            <List>{trans(Lang.CategoryManage)}</List>
          </a>
        </Link>

        <Link href='/admin/posts' passHref>
          <a>
          <List>{trans(Lang.BoardManage)}</List>
          </a>
        </Link>

        <List>{trans(Lang.CommentManage)}</List>
      </ListContainer>
      <TitleWrapper>
        <SideBarIcon icon={faUsersCog} />
        <Title>{trans(Lang.Setting)}</Title>
      </TitleWrapper>
      <ListContainer>
        <List
          onClick={() => {
            logout();
            router.push('/admin/login');
          }}
        >
          {trans(Lang.Logout)}
        </List>
      </ListContainer>
    </Container>
  );
}
