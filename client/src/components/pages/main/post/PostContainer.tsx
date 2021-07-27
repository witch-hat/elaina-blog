import React from 'react';
import styled from 'styled-components';

import { PostDetailDataType } from 'src/query/post';

import { PostItem } from './PostItem';

const Container = styled.div({
  width: '100%',
  minHeight: 'calc(100vh - 4rem)',
  padding: '0 1rem'
});

interface Props {
  posts: PostDetailDataType[];
}

export function PostContainer(props: Props) {
  return (
    <Container>
      {props.posts.map((post) => (
        <PostItem key={post.article + post._id} post={post} />
      ))}
      {props.posts.length === 10 && <div>더보기</div>}
    </Container>
  );
}

export const MemoizedPostContainer = React.memo(PostContainer);
