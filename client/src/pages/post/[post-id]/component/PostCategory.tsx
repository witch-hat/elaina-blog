import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';

import { theme } from 'src/styles';
import { BorderBox } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const FadeIn = keyframes({
  from: {
    opacity: 0,
    transform: 'translateX(-1rem)'
  },
  to: {
    opacity: 1,
    transform: 'translateX(0)'
  }
});

const Container = styled.nav<{ themeMode: ThemeMode }>(
  (props) => ({
    width: '250px',
    display: 'flex',
    flexDirection: 'column',
    position: 'sticky',
    top: 'calc(5rem + 20px)',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    height: 'calc(100vh - 5rem - 20px)',
    padding: '.5rem',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '0'
    },
    '@media screen and (max-width: 1380px)': {
      width: '28%',
      minWidth: '240px'
    },
    '@media screen and (max-width: 767px)': {
      width: '50%',
      minWidth: '250px',
      position: 'fixed',
      top: '5rem',
      left: 0,
      height: 'calc(100vh - 5rem)',
      backgroundColor: theme[props.themeMode].secondaryContentBackground,
      borderRadius: '0 8px 8px 0',
      boxShadow: `5px 0 4px ${theme[props.themeMode].shadowColor}`
    }
  }),
  css`
    @media screen and (max-width: 767px) {
      animation: 0.4s ${FadeIn} forwards;
    }
  `
);

const CategoryName = styled.span({
  fontSize: '1.4rem',
  fontWeight: 'bold'
});

const TitleContainer = styled.ul({
  marginTop: '.5rem',
  padding: '0 .75rem',
  width: '100%'
});

const TitleList = styled.li({
  width: '100%',
  padding: '.2rem 0',
  margin: '.4rem 0',
  cursor: 'pointer',
  '&:hover': {
    fontWeight: 'bolder',
    textDecoration: 'underline'
  }
});

const Title = styled.span<{ bold: boolean }>((props) => ({
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  fontWeight: props.bold ? 'bold' : 'normal'
}));

interface Props {
  titles: [{ title: string; postUrl: string }];
  currentPostTitle: string;
  category: { title: string };
}

export default function PostCategory(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Container themeMode={themeMode}>
      <CategoryName>{props.category.title}</CategoryName>
      <TitleContainer>
        {props.titles.map(({ title, postUrl }) => {
          return (
            <TitleList key={title}>
              <Link href={`/post/${postUrl}`}>
                <Title bold={props.currentPostTitle === title}>{title}</Title>
              </Link>
            </TitleList>
          );
        })}
      </TitleContainer>
    </Container>
  );
}
