import React, { useState } from 'react';
import styled from 'styled-components';
import { ProfileType } from 'src/query/profile';
import { About } from 'src/query/about';

import { MemoizedAboutContent } from './component/AboutContent';
import { AboutMenu } from './component/AboutMenu';

const Container = styled.section({
  width: '100%',
  minHeight: '100vh',
  marginTop: '2rem'
});

interface Props {
  about: About;
  profile: ProfileType;
  isLogin: boolean;
}

export function AboutPage(props: Props) {
  return (
    <Container>
      <AboutMenu name={props.profile.name} updatedAt={props.about.updatedAt} isLogin={props.isLogin} />
      <MemoizedAboutContent content={props.about.article} />
    </Container>
  );
}
