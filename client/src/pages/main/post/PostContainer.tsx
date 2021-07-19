import styled from 'styled-components';

const Container = styled.div({
  width: '100%',
  minHeight: 'calc(100vh - 4rem)'
});

interface Props {}

export function PostContainer(props: Props) {
  return <Container>최신글</Container>;
}
