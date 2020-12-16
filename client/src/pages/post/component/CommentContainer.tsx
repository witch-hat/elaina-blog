import React from 'react';
import styled from 'styled-components';

import { BorderBox, InputBox } from 'src/components';
import Comment from './Comment';

const Container = styled.section({
  display: 'flex',
  width: '100%',
  marginTop: '20px',
  padding: '.5rem 1.5rem',
  flexDirection: 'column',
  jusitfyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '20rem',
  '@media screen and (max-width: 768px)': {
    padding: '0'
  }
});

const Title = styled.span({
  display: 'block',
  width: '100%',
  fontSize: '1.4rem',
  fontWeight: 'bold'
});

const EditorWrapper = styled.form({
  width: '100%',
  margin: '2rem 0'
});

const CommentEditor = styled.textarea({
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

const Counter = styled.div({
  width: '100%',
  fontSize: '1.15rem',
  fontWeight: 'bold'
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

export default function CommentContainer() {
  return (
    <Container>
      <Title>Comments</Title>
      <EditorWrapper action='/comment' method='POST'>
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
        <CommentEditor placeholder='Write comment...(5자 이상)' minLength={5} />
        <SubmitButton>덧글 작성</SubmitButton>
      </EditorWrapper>
      <div style={{ width: '100%' }}>
        <Counter>덧글 수: 3개</Counter>
        {/* db에서 comments 꺼내서 각각 <Comment /> 나열, 임시로 3개만 둬봄 */}
        <Comment />
        <Comment />
        <Comment />
      </div>
    </Container>
  );
}
