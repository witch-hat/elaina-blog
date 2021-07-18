import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div((props) => ({
  width: '100%',
  height: '9rem',
  padding: '.5rem',
  marginBottom: '1rem',
  border: `1px solid ${props.theme.borderColor}`,
  borderRadius: '.5rem',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const FlexBox = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'flex-start'
});

const TextWrapper = styled.div({
  flex: '3'
});

const PostTitle = styled.p({
  display: '-webkit-box',
  width: '100%',
  marginBottom: '.5rem',
  wordBreak: 'break-all',
  textAlign: 'left',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  fontSize: '1.1rem',
  fontWeight: 'bold',
  '&:hover': {
    cursor: 'pointer'
  }
});

const ArticleSummary = styled.p({
  display: '-webkit-box',
  width: '100%',
  wordBreak: 'break-all',
  textAlign: 'left',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical',
  '&:hover': {
    cursor: 'pointer'
  }
});

const PreviewImage = styled.div({
  height: '100%',
  marginLeft: '.5rem',
  flex: '1'
});

interface Props {
  post: { _id: number; title: string; article: string };
}

export function PostItem(props: Props) {
  return (
    <Container>
      <Link href={`/post/${props.post._id}`}>
        <a>
          <FlexBox>
            <TextWrapper>
              <PostTitle>{props.post.title}</PostTitle>
              <ArticleSummary>{props.post.article}</ArticleSummary>
            </TextWrapper>
            <PreviewImage>이미지</PreviewImage>
          </FlexBox>
        </a>
      </Link>
    </Container>
  );
}

export const MemoizedPostItem = React.memo(PostItem);
