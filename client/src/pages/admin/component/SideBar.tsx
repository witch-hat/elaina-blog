import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import Profile from 'src/pages/main/component/Profile';

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
  borderRadius: '1rem',
  marginBottom: '1rem'
});

export function SideBar() {
  return (
    <Container>
      <Link href='/admin/writer'>
        <Button>글쓰기</Button>
      </Link>
      <TitleWrapper>
        <Icon>
          <i className='fas fa-pager'></i>
        </Icon>
        <Title>컨텐츠</Title>
      </TitleWrapper>
      <ListContainer>
        <Link href='/admin/category' passHref>
          <a>
            <List>카테고리 관리</List>
          </a>
        </Link>
        <List>글 관리</List>
        <List>댓글 관리</List>
      </ListContainer>
      <TitleWrapper>
        <Icon>
          <i className='fas fa-chart-line'></i>
        </Icon>
        <Title>통계</Title>
      </TitleWrapper>
      <ListContainer>
        <List>조회수</List>
      </ListContainer>
    </Container>
  );
}
