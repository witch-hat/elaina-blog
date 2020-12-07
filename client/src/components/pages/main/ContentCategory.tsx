import styled from 'styled-components';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '10px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

interface Props {}

export function ContentCategory() {
  return <Container>This is Content Categories</Container>;
}
