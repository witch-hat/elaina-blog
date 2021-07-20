import styled from 'styled-components';

import { BorderBox } from 'src/components';

const Container = styled.div({
  width: '100%',
  padding: '.5rem'
});

const Title = styled.p({
  display: '-webkit-box',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  wordBreak: 'break-all',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical'
});

interface Props {
  post: { _id: number; createdAt: number; title: string; article: string };
}

export function PostItem(props: Props) {
  return (
    <BorderBox isHoverEffect={true} styles={{ width: '100%', margin: '1.6rem 0' }}>
      <Container>
        <Title>{props.post.title}</Title>
      </Container>
    </BorderBox>
  );
}
