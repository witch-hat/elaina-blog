import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import { Editor } from 'src/components/common/writer/Editor';
import { UPDATE_ABOUT, UpdateAboutQueryType, AboutDataType, UpdateAboutVars } from 'src/query/about';

import { MemoizedAboutContent } from './AboutContent';
import { AboutMenu } from './AboutMenu';

const Container = styled.section({
  width: '100%',
  marginTop: '2rem'
});

const ButtonContainer = styled.div({
  display: 'flex',
  marginTop: '.5rem',
  alignItems: 'center'
});

const Button = styled.button<{ isSubmit?: boolean }>((props) => ({
  padding: '.5rem',
  marginRight: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.isSubmit ? props.theme.submitButton.buttonColor : 'inherit',
  color: props.isSubmit ? props.theme.submitButton.textColor : 'inherit'
}));

interface Props {
  about: AboutDataType;
  name: string;
  isLogin: boolean;
}

export function AboutPage(props: Props) {
  const [about, setAbout] = useState<AboutDataType>(props.about);
  const router = useRouter();

  const [updateAbout] = useMutation<UpdateAboutQueryType, UpdateAboutVars>(UPDATE_ABOUT);

  function handleChange(text: string) {
    setAbout((prev) => ({ ...prev, article: text }));
  }

  async function handleSubmit() {
    try {
      const { data } = await updateAbout({ variables: { article: about.article } });

      if (!data) {
        alert('No response error!');
        return;
      }

      router.replace('/?tab=about');
    } catch (err) {
      alert(err.message);
    }
  }

  function handleCancel() {
    setAbout((prev) => ({ ...prev, article: props.about.article }));
    router.push('/?tab=about', undefined, { shallow: true });
  }

  if (router.query.edit) {
    return (
      <Container>
        {/* <AboutEditor article={about.article} onUpdate={onUpdate} /> */}
        <Editor value={about.article} handleChange={handleChange} />
        <ButtonContainer>
          <Button onClick={handleSubmit} isSubmit>
            Submit
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </ButtonContainer>
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
