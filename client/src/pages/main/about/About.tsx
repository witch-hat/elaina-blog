import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { AboutQueryReturnType } from 'src/query/about';

import { MemoizedAboutContent } from './component/AboutContent';
import { AboutMenu } from './component/AboutMenu';
import { AboutEditor } from './component/AboutEditor';

const Container = styled.section({
  width: '100%',
  minHeight: '100vh',
  marginTop: '2rem'
});

interface Props {
  about: AboutQueryReturnType;
  name: string;
  isLogin: boolean;
}

export function AboutPage(props: Props) {
  const [about, setAbout] = useState<AboutQueryReturnType>(props.about);
  const router = useRouter();

  function onUpdate(updatedAbout: AboutQueryReturnType) {
    setAbout(updatedAbout);
  }

  if (router.query.edit) {
    return (
      <Container>
        <AboutEditor article={about.article} onUpdate={onUpdate} />
      </Container>
    );
  }

  return (
    <Container>
      <AboutMenu name={props.name} updatedAt={about.updatedAt} isLogin={props.isLogin} />
      <MemoizedAboutContent content={about.article} />
    </Container>
  );
}
