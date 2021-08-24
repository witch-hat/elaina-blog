import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { AboutDataType } from 'src/query/about';

import { MemoizedAboutContent } from './AboutContent';
import { AboutMenu } from './AboutMenu';
import { AboutEditor } from './AboutEditor';

const Container = styled.section({
  width: '100%',
  marginTop: '2rem'
});

interface Props {
  about: AboutDataType;
  name: string;
  isLogin: boolean;
}

export function AboutPage(props: Props) {
  const [about, setAbout] = useState<AboutDataType>(props.about);
  const router = useRouter();

  function onUpdate(updatedAbout: AboutDataType) {
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
