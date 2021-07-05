import styled from 'styled-components';

import { PostItem } from './PostItem';

const Container = styled.div({
  width: '850px',
  marginLeft: '50px'
});

interface Props {
  posts: { _id: number; title: string; article: string }[];
}

export function PostContainer(props: Props) {
  return (
    <Container>
      {props.posts.map((post) => {
        return <PostItem key={post._id} post={post} />;
      })}
    </Container>
  );
}
