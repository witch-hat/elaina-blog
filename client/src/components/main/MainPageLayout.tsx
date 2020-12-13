import styled from 'styled-components';

import CategoryNavigation from './CategoryNavigation';
import Profile from './Profile';

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

interface Props {
  children: JSX.Element;
}

export function MainPageLayout(props: Props) {
  return (
    <Container>
      <Profile />
      <Wrapper>
        <CategoryNavigation />
        {props.children}
      </Wrapper>
    </Container>
  );
}
