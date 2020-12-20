import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { BorderBox } from 'src/components';

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

const Container = styled.nav(
  {
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
    '@media screen and (max-width: 768px)': {
      width: '50%',
      minWidth: '250px',
      position: 'fixed',
      top: '5rem',
      left: 0,
      height: 'calc(100vh - 5rem)',
      backgroundColor: '#eaebec',
      borderRadius: '0 8px 8px 0',
      boxShadow: '5px 0 4px rgba(38, 38, 38, .4)'
    }
  },
  css`
    @media screen and (max-width: 768px) {
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
    fontWeight: 'bold',
    textDecoration: 'underline'
  }
});

const Title = styled.span({
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical'
});

export default function PostCategory() {
  return (
    <Container>
      <CategoryName>React</CategoryName>
      <TitleContainer>
        <TitleList>
          <Title>Post1</Title>
        </TitleList>
        <TitleList>
          <Title>Post TitleList is very long long longlonglong long long long long long long long long long long long long long </Title>
        </TitleList>
        <TitleList>
          <Title>Post 3</Title>
        </TitleList>
        <TitleList>
          <Title>Post 4</Title>
        </TitleList>
        <TitleList>
          <Title>Post 5</Title>
        </TitleList>
        <TitleList>
          <Title>Post 6</Title>
        </TitleList>
        <TitleList>
          <Title>Post 7</Title>
        </TitleList>
        <TitleList>
          <Title>Post 8</Title>
        </TitleList>
        <TitleList>
          <Title>Post 9</Title>
        </TitleList>
        <TitleList>
          <Title>Post 10</Title>
        </TitleList>
        <TitleList>
          <Title>Post 11</Title>
        </TitleList>
        <TitleList>
          <Title>Post 12</Title>
        </TitleList>
        <TitleList>
          <Title>Post 13</Title>
        </TitleList>
        <TitleList>
          <Title>Post 14</Title>
        </TitleList>
        <TitleList>
          <Title>Post 15</Title>
        </TitleList>
      </TitleContainer>
    </Container>
  );
}
