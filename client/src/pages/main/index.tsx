import styled from 'styled-components';

import { Navigation, ContentCategory, Profile } from 'src/pages/main/component';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%'
});

const Wrapper = styled.div({
  width: '1000px',
  padding: '0 0 0 50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start'
});

export default function Main() {
  return (
    <Container>
      <Profile />
      <Wrapper>
        <Navigation />
        <ContentCategory />
      </Wrapper>
    </Container>
  );
}
