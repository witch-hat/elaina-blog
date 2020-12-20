import styled from 'styled-components';

import CategoryNavigation from './CategoryNavigation';
import Profile from './Profile';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  '@media screen and (max-width: 767px)': {
    flexDirection: 'column'
  }
});

const Wrapper = styled.div({
  width: '850px',
  marginLeft: '50px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '@media screen and (max-width: 1380px)': {
    width: '70%',
    marginLeft: '2%'
  },
  '@media screen and (max-width: 767px)': {
    width: '100%',
    margin: '0'
  }
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
