import styled from 'styled-components';

import { PostItem } from './PostItem';

const Container = styled.div({
  width: '850px',
  minHeight: 'calc(100vh - 4rem)',
  marginLeft: '50px'
});

const CountContainer = styled.div({
  marginBottom: '1rem'
});

const Count = styled.p({
  marginBottom: '.5rem',
  fontSize: '1.2rem',
  fontWeight: 'bold'
});

const StyledHr = styled.hr((props) => ({
  width: '100%',
  margin: '0',
  border: 'none',
  borderBottom: `1px solid ${props.theme.borderColor}`
}));

interface Props {
  posts: { _id: number; title: string; article: string }[];
  postCount: number;
}

export function PostContainer(props: Props) {
  return (
    <Container>
      <CountContainer>
        <Count>Post Count: {props.postCount}</Count>
        <StyledHr />
      </CountContainer>
      {props.posts.map((post) => {
        return <PostItem key={post._id} post={post} />;
      })}
    </Container>
  );
}
