import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { PostDetailDataType } from 'src/query/post';

import { PostItem } from './PostItem';

const Container = styled.div({
  width: '100%',
  padding: '0 1rem'
});

const FlexWrapper = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'center'
});

const SeeMoreButton = styled.button({
  padding: '.5rem',
  borderRadius: '.5rem'
});

interface Props {
  posts: PostDetailDataType[];
  totalPosts: number;
}

export function PostContainer(props: Props) {
  const router = useRouter();

  return (
    <Container>
      {props.posts.map((post) => (
        <PostItem key={post.article + post._id} post={post} />
      ))}
      {props.posts.length === 10 && (
        <FlexWrapper>
          <SeeMoreButton onClick={() => router.push({ pathname: '/category/0', query: { page: 2 } })}>더보기</SeeMoreButton>
        </FlexWrapper>
      )}
    </Container>
  );
}

export const MemoizedPostContainer = React.memo(PostContainer);
