import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { BorderBox } from 'src/components';
import ContentCategoryDetails from './ContentCategoryDetails';
import { ThemeMode } from 'src/redux/common/type';
import { mockUpData } from 'src/resources';

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
  theme: ThemeMode;
}

export default function ContentCategory(props: Props) {
  const router = useRouter();
  const { postId } = router.query;

  return (
    <section style={{ width: '100%' }}>
      <Container>
        {mockUpData.category.map((category) => {
          return (
            <Link key={category.name} href={`post/${category.posts[category.posts.length - 1].url}`} passHref>
              <a style={{ width: '100%' }}>
                <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }} theme={props.theme}>
                  <Content>
                    <PreviewTextWrapper>
                      <PreviewTitle>{category.name}</PreviewTitle>
                      <PreviewContent>{category.description}</PreviewContent>
                      <ContentCategoryDetails time='' count={category.posts.length} />
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
