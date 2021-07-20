import styled from 'styled-components';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1
});

export function NoCategory() {
  return (
    <Container>
      <p>No Category...</p>
    </Container>
  );
}
