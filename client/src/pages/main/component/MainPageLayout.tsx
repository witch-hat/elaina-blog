import React from 'react';
import styled from 'styled-components';

import { Navigation } from './navigation/Navigation';
import { ProfileContainer } from './profile/ProfileContainer';

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
  display: 'flex',
  flexDirection: 'column',
  width: '850px',
  marginLeft: '50px',
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
  profile: any;
  isLogin: boolean;
}

export function MainPageLayout(props: Props) {
  return (
    <Container>
      <ProfileContainer profile={props.profile} isLogin={props.isLogin} />
      <Wrapper>
        <Navigation />
        {props.children}
      </Wrapper>
    </Container>
  );
}
