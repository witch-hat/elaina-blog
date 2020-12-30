import React from 'react';
import styled, { css } from 'styled-components';

import { theme } from 'src/styles';
import { InputBox } from 'src/components';
import { ThemeMode } from 'src/redux/common/type';

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

const Editor = styled.span<{ themeMode: ThemeMode }>(
  (props) => ({
    display: 'block',
    fontFamily: '"Nanum Gothic", sans-serif',
    width: '100%',
    minHeight: '5rem',
    overflowY: 'hidden',
    outline: 'none',
    padding: '.5rem',
    resize: 'none',
    border: `1px solid ${theme[props.themeMode].inputBorder}`,
    borderRadius: '12px',
    wordBreak: 'keep-all',
    backgroundColor: theme[props.themeMode].inputBackground,
    color: theme[props.themeMode].inputText
  }),
  // Cannot use &[contenteditable]:empty::before in styled-object...
  css<{ themeMode: ThemeMode }>`
    &[contenteditable]:empty::before {
      content: 'Write comment...';
      color: ${(props) => theme[props.themeMode].placeholderText};
    }
    &[contenteditable]:empty:focus::before {
      content: '';
    }
  `
);

const SubmitButton = styled.button<{ themeMode: ThemeMode }>((props) => ({
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
    backgroundColor: theme[props.themeMode].hoverBackground
  }
}));

interface Props {
  theme: ThemeMode;
}

export default function CommentEditor(props: Props) {
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
            theme={props.theme}
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
            theme={props.theme}
          />
        </UserInput>
      </InputWrapper>
      <Editor role='textbox' themeMode={props.theme} contentEditable />
      <SubmitButton themeMode={props.theme}>덧글 작성</SubmitButton>
    </EditorContainer>
  );
}
