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
      boxShadow: '10px 0 5px rgba(0, 0, 0, .4)'
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

const ContentContainer = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%',
  height: '10rem',
  padding: '.5rem'
});

const Title = styled.span({
  width: '100%',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
});

const Article = styled.p({
  width: '100%',
  marginTop: '1.25rem',
  overflow: 'hidden',
  wordBreak: 'keep-all',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

export default function PostCategory() {
  return (
    <Container>
      <CategoryName>카테고리 이름 ex)JS</CategoryName>
      <BorderBox isTransform={true} styles={{ margin: '1rem 0 0', width: '100%' }}>
        <ContentContainer>
          <Title>Post1</Title>
          <Article>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Article>
        </ContentContainer>
      </BorderBox>
      <BorderBox isTransform={true} styles={{ margin: '1rem 0 0', width: '100%' }}>
        <ContentContainer>
          <Title>Post Title is very long long longlonglong long long</Title>
          <Article>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
            text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has
            survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was
            popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of Lorem Ipsum.
          </Article>
        </ContentContainer>
      </BorderBox>
      <BorderBox isTransform={true} styles={{ margin: '1rem 0 0', width: '100%' }}>
        <ContentContainer>
          <Title>Post 3</Title>
        </ContentContainer>
      </BorderBox>
      <BorderBox isTransform={true} styles={{ margin: '1rem 0 0', width: '100%' }}>
        <ContentContainer>
          <Title>Post 4</Title>
        </ContentContainer>
      </BorderBox>
    </Container>
  );
}
