import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft as prevArrow, faChevronRight as nextArrow } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { BorderBox } from 'src/components';
import { PostDetailDataType } from 'src/query/post';

const StyledA = styled.a({
  display: 'block',
  width: '100%',
  margin: '1.6rem 0'
});

const Container = styled.div({
  width: '100%',
  padding: '.8rem',
  margin: '0 .5rem'
});

const FlexWrapper = styled.div<{ isPrev: boolean }>((props) => ({
  display: 'flex',
  width: '100%',
  padding: '0 1rem',
  alignItems: 'center',
  flexDirection: `${props.isPrev ? 'row' : 'row-reverse'}`
}));

const Title = styled.p<{ isPrev: boolean }>((props) => ({
  display: '-webkit-box',
  marginBottom: '.5rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  wordBreak: 'break-all',
  overflow: 'hidden',
  textAlign: `${props.isPrev ? 'start' : 'end'}`,
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical'
}));

const PreviewArticle = styled.p<{ isPrev: boolean }>((props) => ({
  display: '-webkit-box',
  marginBottom: '.5rem',
  wordBreak: 'break-all',
  overflow: 'hidden',
  textAlign: `${props.isPrev ? 'start' : 'end'}`,
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical'
}));

interface Props {
  post: PostDetailDataType;
  isPrev: boolean;
}

export function SimplePostItem({ isPrev, ...props }: Props) {
  return (
    <Link href={`/post/${props.post._id}`}>
      <StyledA>
        <BorderBox isHoverEffect={true} styles={{ width: '100%', margin: '0' }}>
          <FlexWrapper isPrev={isPrev}>
            <FontAwesomeIcon icon={isPrev ? prevArrow : nextArrow} style={{ fontSize: '3rem' }} />
            <Container>
              <Title isPrev={isPrev}>{props.post.title}</Title>
              <PreviewArticle isPrev={isPrev}>{props.post.article}</PreviewArticle>
            </Container>
          </FlexWrapper>
        </BorderBox>
      </StyledA>
    </Link>
  );
}
