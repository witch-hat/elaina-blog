import styled from 'styled-components';
import { PostDetailDataType } from 'src/query/post';
import { Direction, SimplePostItem } from './SimplePostItem';

const Container = styled.section({
  display: 'flex',
  width: '100%',
  minHeight: '20rem',
  padding: '.5rem 2rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '@media screen and (max-width: 767px)': {
    padding: '.5rem'
  }
});

const NearPosts = styled.div({
  display: 'flex',
  width: '100%',
  flexDirection: 'row',
  justifyContent: 'space-between'
});

const PrevPost = styled.div({
  width: '40%'
});
const NextPost = styled.div({
  width: '40%'
});

const StyleHr = styled.hr((props) => ({
  width: '100%',
  border: 'none',
  margin: '0',
  borderBottom: `2px solid ${props.theme.borderColor}`
}));

interface Prop {
  prevPost: PostDetailDataType | null;
  nextPost: PostDetailDataType | null;
}

export function RelatedPostsContainer({ prevPost, nextPost }: Prop) {
  return (
    <Container>
      <StyleHr />
      <NearPosts>
        <PrevPost>
          {prevPost && <SimplePostItem key={prevPost.article + prevPost._id} post={prevPost} direction={Direction.prev} />}
        </PrevPost>
        <NextPost>
          {nextPost && <SimplePostItem key={nextPost.article + nextPost._id} post={nextPost} direction={Direction.next} />}
        </NextPost>
      </NearPosts>
    </Container>
  );
}
