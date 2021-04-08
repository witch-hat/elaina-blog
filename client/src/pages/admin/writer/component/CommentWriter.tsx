import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { InputBox } from 'src/components';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { Reply, WRITE_COMMENT, Comment, WRITE_REPLY } from 'src/query/comment';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';
import { Lang, trans } from 'src/resources/languages';

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

const Editor = styled.pre<{ themeMode: ThemeMode }>(
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
  isLogin: boolean;
  buttonText: string;
  isReply?: boolean;
  commentIndex?: number;
  setNewComment?: React.Dispatch<React.SetStateAction<Comment | undefined>>;
  setNewReply?: React.Dispatch<React.SetStateAction<Reply | undefined>>;
}

export function CommentWriter(props: Props) {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const editor = useRef<HTMLPreElement>(null);

  const client = useApollo();
  const [writeComment] = useMutation(WRITE_COMMENT);
  const [writeReply] = useMutation(WRITE_REPLY);

  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  function reset() {
    if (usernameRef.current && passwordRef.current) {
      usernameRef.current.value = '';
      passwordRef.current.value = '';
    }
    if (editor.current) {
      editor.current.innerText = '';
    }
    setUsername('');
    setPassword('');
    setComment('');
  }

  async function submitComment() {
    if (comment.length < 2) {
      alert('덧글을 2자 이상 작성해주세요');
      return;
    }

    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAdmin = AuthResponse.data.isAuth.isAuth;
    const _id = +router.query['post-id'];
    const createdAt = new Date().toISOString();

    if (isAdmin) {
      writeComment({
        variables: {
          _id,
          comment,
          createdAt,
          isAdmin
        }
      });

      if (props.setNewComment) {
        props.setNewComment({
          comment,
          createdAt: new Date(createdAt),
          isAdmin,
          replies: []
        });
      }
    } else {
      if (username.length < 2 || password.length < 4) {
        alert('username: 2자 이상, password: 4자 이상 입력해주세요');
        return;
      }

      writeComment({
        variables: {
          _id,
          username,
          password,
          comment,
          createdAt,
          isAdmin
        }
      });

      if (props.setNewComment) {
        props.setNewComment({
          username,
          password,
          comment,
          createdAt: new Date(createdAt),
          isAdmin,
          replies: []
        });
      }
    }

    reset();
  }

  async function submitReply() {
    if (comment.length < 2) {
      alert('덧글을 2자 이상 작성해주세요');
      return;
    }

    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAdmin = AuthResponse.data.isAuth.isAuth;
    const _id = +router.query['post-id'];
    const createdAt = new Date().toISOString();

    if (isAdmin) {
      writeReply({
        variables: {
          _id,
          commentIndex: props.commentIndex,
          comment,
          createdAt,
          isAdmin
        }
      });
    } else {
      if (username.length < 2 || password.length < 4) {
        alert('username: 2자 이상, password: 4자 이상 입력해주세요');
        return;
      }

      writeReply({
        variables: {
          _id,
          commentIndex: props.commentIndex,
          username,
          password,
          comment,
          createdAt,
          isAdmin
        }
      });
    }

    if (props.setNewReply) {
      props.setNewReply({
        username,
        password,
        comment,
        createdAt: new Date(createdAt),
        isAdmin
      });
    }

    reset();
  }

  return (
    <EditorContainer action='/comment' method='POST'>
      {props.isLogin || (
        <InputWrapper>
          <UserInput>
            ID:&nbsp;
            <InputBox
              id='comment-id'
              ref={usernameRef}
              type='text'
              maxLength={10}
              minLength={2}
              placeholder='ID'
              styles={{ width: '100px', height: '2rem', small: { width: '100px', height: '2rem' } }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
            />
          </UserInput>
          <UserInput>
            PW:&nbsp;
            <InputBox
              id='comment-pw'
              ref={passwordRef}
              type='password'
              maxLength={12}
              minLength={4}
              placeholder='Password'
              styles={{ width: '100px', height: '2rem', small: { width: '100px', height: '2rem' } }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            />
          </UserInput>
        </InputWrapper>
      )}
      <Editor
        role='textbox'
        themeMode={themeMode}
        contentEditable
        ref={editor}
        onInput={(e: React.KeyboardEvent<HTMLPreElement>) => setComment(e.currentTarget.textContent || '')}
      />
      <SubmitButton
        themeMode={themeMode}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          props.isReply ? submitReply() : submitComment();
        }}
      >
        {props.buttonText}
      </SubmitButton>
    </EditorContainer>
  );
}
