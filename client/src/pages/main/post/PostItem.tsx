import Link from 'next/link';
import styled from 'styled-components';

import { BorderBox } from 'src/components';
import { FormatUnifier } from 'src/utils';

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

const PreviewArticle = styled.p({
  display: '-webkit-box',
  wordBreak: 'break-all',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

const DetailWrapper = styled.div({});

interface Props {
  post: { _id: number; createdAt: number; title: string; article: string };
}

export function PostItem(props: Props) {
  return (
    <Link href={`/post/${props.post._id}`}>
      <a>
        <BorderBox isHoverEffect={true} styles={{ width: '100%', margin: '1.6rem 0' }}>
          <Container>
            <Title>{props.post.title}</Title>
            <PreviewArticle>{props.post.article}</PreviewArticle>
            <DetailWrapper>
              <p>{FormatUnifier.getFullFormatDate(new Date(props.post.createdAt))}</p>
            </DetailWrapper>
          </Container>
        </BorderBox>
      </a>
    </Link>
  );
}
