import styled from 'styled-components';

const Container = styled.div({
  width: '100%',
  height: '150px',
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export function Category() {
  return <Container>This is Category</Container>;
}
