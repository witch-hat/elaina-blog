import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { BorderBox } from 'src/components';
import ContentCategoryDetails from './ContentCategoryDetails';
import { mockUpData } from 'src/resources';
import { Category } from 'src/query/category';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '.9rem 0',
  justifyContent: 'center',
  alignItems: 'center',
  '& > div:nth-child(1)': {
    margin: '0 0 .8rem !important'
  }
});

const Content = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '.8rem',
  height: '10rem'
});

const PreviewImage = styled.img({
  width: '260px',
  marginLeft: '1rem',
  height: '8.4rem',
  objectFit: 'cover',
  float: 'right',
  '@media screen and (max-width: 1380px)': {
    width: '32%',
    marginLeft: '3%'
  }
});

const PreviewTextWrapper = styled.div({
  width: '100%',
  display: 'flex',
  height: '8.4rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center'
});

const PreviewTitle = styled.span({
  flexShrink: 0,
  height: '2rem',
  width: '100%',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  textAlign: 'left',
  wordBreak: 'keep-all',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '@media screen and (max-width: 1380px)': {
    wordBreak: 'break-all'
  }
});

const PreviewContent = styled.span({
  flexShrink: 0,
  width: '100%',
  height: '4.5rem',
  fontSize: '1.1rem',
  margin: '.25rem 0 0',
  wordBreak: 'keep-all',
  textAlign: 'left',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

interface Props {
  categories: Category[];
}

export function ContentCategory(props: Props) {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <section style={{ width: '100%' }}>
      <Container>
        {props.categories.map((category) => {
          return (
            // Need to connect with post db and change href
            <Link key={category.title} href='/' passHref>
              <a style={{ width: '100%' }}>
                <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
                  <Content>
                    <PreviewTextWrapper>
                      <PreviewTitle>{category.title}</PreviewTitle>
                      <PreviewContent>{category.description}</PreviewContent>
                      {/* need to connect with post db */}
                      {/* <ContentCategoryDetails time='' count={category.posts.length} /> */}
                    </PreviewTextWrapper>
                    <PreviewImage src='/images/FakeProfile.png' alt='preview image' />
                  </Content>
                </BorderBox>
              </a>
            </Link>
          );
        })}
      </Container>
    </section>
  );
}
