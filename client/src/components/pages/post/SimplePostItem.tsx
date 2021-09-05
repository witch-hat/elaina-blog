import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft as prevArrow, faChevronRight as nextArrow } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { BorderBox } from 'src/components';
import { PostDetailDataType } from 'src/query/post';
import { FlexDirection, TextAlign } from './BoxDesigns';

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

const FlexWrapper = styled.div({
  display: 'flex',
  width: '100%',
  padding: '0 1rem',
  alignItems: 'center'
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

interface Styles {
  textAlign: TextAlign;
  flexDirection: FlexDirection;
}

interface Direction {
  isPrev: boolean;
  styles: Styles;
}

interface Props {
  post: PostDetailDataType;
  direction: Direction;
}

export const Direction: { prev: Direction; next: Direction } = {
  prev: {
    isPrev: true,
    styles: { textAlign: TextAlign.start, flexDirection: FlexDirection.row }
  },
  next: {
    isPrev: false,
    styles: {
      textAlign: TextAlign.end,
      flexDirection: FlexDirection.rowReverse
    }
  }
};

export function SimplePostItem({ direction, ...props }: Props) {
  return (
    <Link href={`/post/${props.post._id}`}>
      <StyledA>
        <BorderBox isHoverEffect={true} styles={{ width: '100%', margin: '0' }}>
          <FlexWrapper style={{ flexDirection: direction.styles.flexDirection }}>
            <FontAwesomeIcon icon={direction.isPrev ? prevArrow : nextArrow} style={{ fontSize: '3rem' }} />
            <Container>
              <Title style={{ textAlign: direction.styles.textAlign }}>{props.post.title}</Title>
              <PreviewArticle style={{ textAlign: direction.styles.textAlign }}>{props.post.article}</PreviewArticle>
            </Container>
          </FlexWrapper>
        </BorderBox>
      </StyledA>
    </Link>
  );
}
