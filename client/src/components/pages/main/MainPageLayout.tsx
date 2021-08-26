import React from 'react';
import styled from 'styled-components';

import { Navigation } from './navigation/Navigation';
import { Profile } from './profile/Profile';

const Container = styled.div({
  display: 'flex',
  width: '1200px',
  minHeight: '100vh',
  margin: '0 auto',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '@media screen and (max-width: 767px)': {
    width: '100%',
    flexDirection: 'column'
  }
});

const Wrapper = styled.div({
  display: 'flex',
  width: '850px',
  padding: '0 .5rem',
  marginLeft: '50px',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  '@media screen and (max-width: 1380px)': {
    width: '70%',
    maxWidth: '850px',
    marginLeft: '2%'
  },
  '@media screen and (max-width: 767px)': {
    width: '100%',
    margin: '0'
  }
});

interface Props {
  children: JSX.Element;
  tab: string;
  profile: any;
  isLogin: boolean;
}

export function MainPageLayout(props: Props) {
  return (
    <Container>
      <Profile profile={props.profile} isLogin={props.isLogin} />
      <Wrapper>
        <Navigation tab={props.tab} isLogin={props.isLogin} />
        {props.children}
      </Wrapper>
    </Container>
  );
}
