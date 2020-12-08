import styled from 'styled-components';

import { Profile, ContentCategory, FlexWrapper, Category } from 'components';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%'
});

const Wrapper = styled.div({
  width: '1000px',
  padding: '0 0 0 30px',
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
        <Category />
        <ContentCategory />
      </Wrapper>
    </Container>
  );
}
