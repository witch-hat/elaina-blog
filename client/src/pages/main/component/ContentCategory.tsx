import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { BorderBox } from 'src/components';
import { CategoryDetails } from 'src/query/category';

import { ContentCategoryDetails } from './ContentCategoryDetails';

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
  width: '100%',
  height: '10rem',
  padding: '.8rem',
  justifyContent: 'center',
  alignItems: 'center'
});

const PreviewImage = styled.img({
  float: 'right',
  width: '260px',
  height: '8.4rem',
  marginLeft: '1rem',
  objectFit: 'cover',
  '@media screen and (max-width: 1380px)': {
    width: '32%',
    marginLeft: '3%'
  }
});

const PreviewTextWrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '8.4rem',
  alignItems: 'flex-start',
  justifyContent: 'center'
});

const PreviewTitle = styled.span({
  display: '-webkit-box',
  flexShrink: 0,
  width: '100%',
  height: '2rem',
  textAlign: 'left',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  wordBreak: 'keep-all',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '@media screen and (max-width: 1380px)': {
    wordBreak: 'break-all'
  }
});

const PreviewContent = styled.span({
  display: '-webkit-box',
  flexShrink: 0,
  width: '100%',
  height: '4.5rem',
  fontSize: '1.1rem',
  margin: '.25rem 0 0',
  wordBreak: 'keep-all',
  textAlign: 'left',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

interface Props {
  categories: CategoryDetails[];
  latestPosts: [{ _id: number }];
  isLogin: boolean;
}

export function ContentCategory(props: Props) {
  return (
    <section style={{ width: '100%' }}>
      <Container>
        {props.categories.map((category, index) => {
          if (props.latestPosts[index] === null) {
            if (props.isLogin) {
              return (
                <Link key={category.title} href={`/admin/writer?category=${category.title}`} passHref>
                  <BorderBox key={index} isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
                    <Content>
                      <PreviewTextWrapper>
                        <PreviewTitle>{category.title}</PreviewTitle>
                        <PreviewContent>{category.description}</PreviewContent>
                        <ContentCategoryDetails count={0} />
                      </PreviewTextWrapper>
                      <PreviewImage src={category.previewImage} alt={`${category.title} preview image`} />
                    </Content>
                  </BorderBox>
                </Link>
              );
            } else {
              return (
                <BorderBox key={index} isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
                  <Content>
                    <PreviewTextWrapper>
                      <PreviewTitle>{category.title}</PreviewTitle>
                      <PreviewContent>{category.description}</PreviewContent>
                      <ContentCategoryDetails count={0} />
                    </PreviewTextWrapper>
                    <PreviewImage src={category.previewImage} alt={`${category.title} preview image`} />
                  </Content>
                </BorderBox>
              );
            }
          }
          return (
            // need to change href to recent post
            <Link key={category.title} href={`/post/${props.latestPosts[index]._id}`} passHref>
              <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
                <Content>
                  <PreviewTextWrapper>
                    <PreviewTitle>{category.title}</PreviewTitle>
                    <PreviewContent>{category.description}</PreviewContent>
                    <ContentCategoryDetails time={`${category.recentCreatedAt}`} count={category.postCount} />
                  </PreviewTextWrapper>
                  <PreviewImage src={category.previewImage} alt={`${category.title} preview image`} />
                </Content>
              </BorderBox>
            </Link>
          );
        })}
      </Container>
    </section>
  );
}
