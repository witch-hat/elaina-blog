import Link from 'next/link';
import styled from 'styled-components';

import { BorderBox } from 'src/components';
import { PostDetailDataType } from 'src/query/post';

const StyledA = styled.a({
  display: 'block',
  width: '100%',
  margin: '1.6rem 0'
});

const Container = styled.div({
  width: '100%',
  padding: '.8rem'
});

const Title = styled.p({
  display: '-webkit-box',
  marginBottom: '.5rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  wordBreak: 'break-all',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical'
});

const PreviewArticle = styled.p({
  display: '-webkit-box',
  marginBottom: '.5rem',
  wordBreak: 'break-all',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

interface Props {
  post: PostDetailDataType;
}

export function SimplePostItem(props: Props) {
  return (
    <Link href={`/post/${props.post._id}`}>
      <StyledA>
        <BorderBox isHoverEffect={true} styles={{ width: '100%', margin: '0' }}>
          <Container>
            <Title>{props.post.title}</Title>
            <PreviewArticle>{props.post.article}</PreviewArticle>
          </Container>
        </BorderBox>
      </StyledA>
    </Link>
  );
}
