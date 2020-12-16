import React, { useState } from 'react';
import styled from 'styled-components';

import { BorderBox, useWidth } from 'src/components';

const Container = styled.nav({
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
  '@media screen and (max-width: 1280px)': {
    width: '28%'
  },
  '@media screen and (max-width: 768px)': {
    width: 'max-content'
  }
});

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

const ResponsiveButton = styled.div({
  display: 'none',
  '@media screen and (max-width: 768px)': {
    display: 'flex',
    alignItems: 'center',
    marginTop: '.5rem',
    justifyContent: 'center',
    fontSize: '1.3rem',
    padding: '.5rem',
    width: '2.5rem',
    height: '2.5rem',
    border: '1px solid #ddd',
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: '#eee'
    }
  }
});

export default function PostCategory() {
  const width = useWidth();
  const [isCategoryOpen, setIsCategoryOpen] = useState(window.innerWidth > 768);

  return (
    <Container>
      <ResponsiveButton onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
        <i className='fas fa-bars'></i>
      </ResponsiveButton>
      {width > 768 || isCategoryOpen ? (
        <>
          <CategoryName>카테고리 이름 ex)JS</CategoryName>
          <BorderBox isTransform={true} styles={{ margin: '1rem 0 0', width: '100%' }}>
            <ContentContainer>
              <Title>Post1</Title>
              <Article>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </Article>
            </ContentContainer>
          </BorderBox>
          <BorderBox isTransform={true} styles={{ margin: '1rem 0 0', width: '100%' }}>
            <ContentContainer>
              <Title>Post Title is very long long longlonglong long long</Title>
              <Article>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
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
        </>
      ) : null}
    </Container>
  );
}
