import styled from 'styled-components';

const Container = styled.div({
  width: '850px',
  marginLeft: '50px'
});

interface Props {
  posts: { _id: number; title: string }[];
}

export function PostContainer(props: Props) {
  return (
    <Container>
      {props.posts.map((post) => {
        return <div>{post.title}</div>;
      })}
    </Container>
  );
}
