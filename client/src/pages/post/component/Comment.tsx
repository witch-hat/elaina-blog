import React from 'react';
import styled from 'styled-components';

import { BorderBox, InputBox } from 'src/components';

const Container = styled.section({
  display: 'flex',
  width: '100%',
  margin: '20px 0',
  padding: '.5rem 1.5rem',
  flexDirection: 'column',
  jusitfyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '20rem'
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

const CommentContainer = styled.div({
  width: '98%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '8rem',
  padding: '.5rem'
});

const CommentContent = styled.p({
  margin: '.2rem',
  display: 'flex',
  alignItems: 'center',
  width: '95%',
  minHeight: '5rem',
  padding: '.5rem',
  borderRadius: '8px',
  backgroundColor: '#efefef'
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

const Reply = styled.span({
  width: '95%',
  padding: '0 .5rem',
  marginTop: '.3rem',
  textAlign: 'right',
  fontSize: '.8rem',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    textDecoration: 'solid underline #1f2f3f 1px'
  }
});

const DetailsContainer = styled.div({
  display: 'flex',
  width: '95%',
  height: '2.1rem',
  justifyContent: 'space-between'
});

const InformationContainer = styled.div({
  display: 'flex',
  fontSize: '.8rem',
  alignItems: 'center'
});

const Author = styled.div({
  marginRight: '.7rem',
  display: 'flex',
  alignItems: 'center'
});

const MenuButton = styled.div({
  fontSize: '.8rem',
  padding: '.5rem .8rem',
  cursor: 'pointer',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#eee'
  }
});

export default function Comment() {
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
        <BorderBox isTransform={false} styles={{ margin: '1rem 0 0', width: '100%' }}>
          <CommentContainer>
            <DetailsContainer>
              <InformationContainer>
                <Author>
                  <i className='fas fa-user'></i>&nbsp;Hoit
                </Author>
                <span>
                  <i className='far fa-clock'></i>&nbsp;2020.12.14 15:50
                </span>
              </InformationContainer>
              <MenuButton>
                <i className='fas fa-ellipsis-v'></i>
              </MenuButton>
            </DetailsContainer>
            <CommentContent>Hi~</CommentContent>
            <Reply>Add Reply</Reply>
          </CommentContainer>
        </BorderBox>
        <BorderBox isTransform={false} styles={{ margin: '1rem 0 0', width: '100%' }}>
          <CommentContainer>
            <DetailsContainer>
              <InformationContainer>
                <Author>
                  <i className='fas fa-user'></i>&nbsp;Hoit
                </Author>
                <span>
                  <i className='far fa-clock'></i>&nbsp;2020.12.14 15:50
                </span>
              </InformationContainer>
              <MenuButton>
                <i className='fas fa-ellipsis-v'></i>
              </MenuButton>
            </DetailsContainer>
            <CommentContent>좋은 글이였습니다!</CommentContent>
            <Reply>Add Reply</Reply>
          </CommentContainer>
        </BorderBox>
        <BorderBox isTransform={false} styles={{ margin: '1rem 0 0', width: '100%' }}>
          <CommentContainer>
            <DetailsContainer>
              <InformationContainer>
                <Author>
                  <i className='fas fa-user'></i>&nbsp;Hoit
                </Author>
                <span>
                  <i className='far fa-clock'></i>&nbsp;2020.12.14 15:50
                </span>
              </InformationContainer>
              <MenuButton>
                <i className='fas fa-ellipsis-v'></i>
              </MenuButton>
            </DetailsContainer>
            <CommentContent>으으...</CommentContent>
            <Reply>Add Reply</Reply>
          </CommentContainer>
        </BorderBox>
      </div>
    </Container>
  );
}
