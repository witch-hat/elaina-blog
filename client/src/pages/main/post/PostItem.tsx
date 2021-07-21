import Link from 'next/link';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faComment, faHeart } from '@fortawesome/free-solid-svg-icons';

import { BorderBox } from 'src/components';
import { FormatUnifier } from 'src/utils';
import { LatestPostQueryReturnType } from 'src/query/post';

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

const DetailWrapper = styled.div((props) => ({
  fontSize: '.85rem',
  color: props.theme.detailText
}));

const Detail = styled.span({
  display: 'inline-flex',
  marginRight: '1rem',
  alignItems: 'center'
});

interface Props {
  post: LatestPostQueryReturnType;
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
              <Detail>
                <FontAwesomeIcon icon={faClock} style={{ marginRight: '.35rem' }} />
                <p>{FormatUnifier.getFullFormatDate(new Date(props.post.createdAt))}</p>
              </Detail>
              <Detail>
                <FontAwesomeIcon icon={faHeart} style={{ marginRight: '.35rem' }} />
                <p>{props.post.likeCount}</p>
              </Detail>
              <Detail>
                <FontAwesomeIcon icon={faComment} style={{ marginRight: '.35rem' }} />
                <p>{props.post.commentCount}</p>
              </Detail>
            </DetailWrapper>
          </Container>
        </BorderBox>
      </a>
    </Link>
  );
}
