import React from 'react';
import styled from 'styled-components';

import { InputBox } from 'src/components';

const EditorContainer = styled.form({
  width: '100%',
  margin: '1rem 0 2rem'
});

const InputWrapper = styled.div({
  display: 'flex',
  marginBottom: '.5rem',
  '@media screen and (max-width: 400px)': {
    flexDirection: 'column',
    '& > div:last-child': {
      margin: '0'
    }
  }
});

const UserInput = styled.div({
  display: 'flex',
  alignItems: 'center',
  marginRight: '1rem',
  '@media screen and (max-width: 400px)': {
    margin: '0 0 .5rem'
  }
});

const Editor = styled.textarea({
  fontFamily: '"Nanum Gothic", sans-serif',
  width: '100%',
  height: '5rem',
  overflowY: 'auto',
  outline: 'none',
  padding: '.5rem',
  resize: 'none',
  border: '1px solid #ddd',
  borderRadius: '12px',
  wordBreak: 'keep-all'
});

const SubmitButton = styled.button({
  width: '8rem',
  margin: '1rem 0 0',
  height: '3rem',
  padding: '.5rem',
  display: 'flex',
  border: '1px solid #ddd',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: '#ddd'
  }
});

export default function CommentEditor() {
  return (
    <EditorContainer action='/comment' method='POST'>
      <InputWrapper>
        <UserInput>
          ID:&nbsp;
          <InputBox
            id='comment-id'
            type='text'
            maxLength={10}
            minLength={2}
            placeholder='ID'
            styles={{ width: '100px', height: '2rem', small: { width: '100px', height: '2rem' } }}
          />
        </UserInput>
        <UserInput>
          PW:&nbsp;
          <InputBox
            id='comment-pw'
            type='password'
            maxLength={12}
            minLength={4}
            placeholder='Password'
            styles={{ width: '100px', height: '2rem', small: { width: '100px', height: '2rem' } }}
          />
        </UserInput>
      </InputWrapper>
      <Editor placeholder='Write comment...(5자 이상)' minLength={5} />
      <SubmitButton>덧글 작성</SubmitButton>
    </EditorContainer>
  );
}
