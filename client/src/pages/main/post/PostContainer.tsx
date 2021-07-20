import Link from 'next/link';
import styled from 'styled-components';

import { PostItem } from './PostItem';

const Container = styled.div({
  width: '100%',
  minHeight: 'calc(100vh - 4rem)',
  padding: '0 1rem'
});

interface Props {
  posts: { _id: number; createdAt: number; title: string; article: string }[];
}

export function PostContainer(props: Props) {
  return (
    <Container>
      {props.posts.map((post) => (
        <Link href={`/post/${post._id}`}>
          <a>
            <PostItem key={post.article + post._id} post={post} />
          </a>
        </Link>
      ))}
      {props.posts.length === 10 && <div>더보기</div>}
    </Container>
  );
}
