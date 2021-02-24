import React from 'react';
import styled from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Container = styled.section({
  width: '800px',
  display: 'flex',
  padding: '.5rem 1.5rem',
  flexDirection: 'column',
  jusitfyContent: 'flex-start',
  alignItems: 'center',
  minHeight: 'calc(100vh - 5rem - 40px)',
  '@media screen and (max-width: 1380px)': {
    width: '100%'
  },
  '@media screen and (max-width: 767px)': {
    padding: '.5rem'
  }
});

const Title = styled.header({
  width: '100%',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  '@media screen and (max-width: 767px)': {
    fontSize: '2rem'
  }
});

const Menu = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  height: '2.2rem',
  alignItems: 'center',
  fontSize: '.875rem'
});

const Article = styled.article({
  marginTop: '2rem',
  fontSize: '1.1rem',
  wordBreak: 'keep-all'
});

const ContentInfoWrapper = styled.div({
  display: 'flex'
});

const Author = styled.span({
  marginRight: '1rem',
  display: 'flex',
  alignItems: 'center'
});

const Time = styled.span({
  display: 'flex',
  alignItems: 'center'
});

const MenuButton = styled.div({
  padding: '.5rem .8rem',
  cursor: 'pointer',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#eee'
  }
});

interface Props {
  title: string;
  author: string;
  createdAt: string;
  article: string;
}

export default function Content(props: Props) {
  const time = new Date(props.createdAt);
  return (
    <Container>
      <Title>{props.title}</Title>
      <Menu>
        <ContentInfoWrapper>
          <Author>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
            {props.author}
          </Author>
          <Time>
            <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5rem' }} />
            {`${time.getFullYear()}.${time.getMonth() + 1}.${time.getDate()} ${time.getHours()}:${time.getMinutes()}`}
          </Time>
        </ContentInfoWrapper>
        <MenuButton>
          <FontAwesomeIcon icon={faEllipsisV} />
        </MenuButton>
      </Menu>
      <Article>{props.article}</Article>
    </Container>
  );
}
