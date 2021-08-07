import React, { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

import { Lang, trans } from 'src/resources/languages';
import { MemoizedInputContainer } from './InputContainer';

const EditorContainer = styled.form({
  width: '100%',
  margin: '1rem 0 .5rem 0'
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

const Editor = styled.textarea((props) => ({
  display: 'block',
  width: '100%',
  minHeight: '5rem',
  padding: '.5rem',
  border: `1px solid ${props.theme.inputBorder}`,
  borderRadius: '.5rem',
  outline: 'none',
  backgroundColor: props.theme.inputBackground,
  overflowY: 'hidden',
  resize: 'none',
  wordBreak: 'keep-all',
  color: props.theme.inputText
}));

const ButtonContainer = styled.div({
  display: 'flex',
  width: '100%',
  height: '2.5rem',
  margin: '1rem 0 0',
  justifyContent: 'flex-end'
});

const SubmitButton = styled.button((props) => ({
  display: 'flex',
  width: '6rem',
  height: '100%',
  padding: '.5rem',
  border: '1px solid #ddd',
  borderRadius: '.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: props.theme.hoverBackground
  }
}));

export interface WriterProps {
  isLogin: boolean;
  addComment: (username: string, password: string, comment: string) => Promise<void>;
  isComment?: boolean;
}

export function Writer(props: WriterProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');
  const textRef = useRef<HTMLTextAreaElement>(null);

  function reset() {
    setUsername('');
    setPassword('');
    setComment('');
  }

  const resizeHeightHandler = () => {
    if (textRef === null || textRef.current === null) {
      return;
    }
    textRef.current.style.height = '5rem';
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await props.addComment(username, password, comment);

    props.isComment && reset();
  }

  const onIDChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value), []);

  const onPWChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), []);

  return (
    <EditorContainer onSubmit={onSubmit}>
      {props.isLogin || (
        <InputWrapper>
          <MemoizedInputContainer
            label='ID'
            type='text'
            minLength={2}
            maxLength={10}
            placeholder='ID'
            value={username}
            onChange={onIDChange}
          />
          <MemoizedInputContainer
            label='PW'
            type='password'
            minLength={8}
            maxLength={20}
            placeholder='PW'
            value={password}
            onChange={onPWChange}
          />
        </InputWrapper>
      )}
      <Editor
        role='textbox'
        placeholder='Comment...'
        value={comment}
        ref={textRef}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setComment(e.target.value);
          resizeHeightHandler();
        }}
      />
      <ButtonContainer>
        <SubmitButton type='submit'>{trans(Lang.Save)}</SubmitButton>
      </ButtonContainer>
    </EditorContainer>
  );
}
