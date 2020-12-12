import React from 'react';
import styled from 'styled-components';

import { BorderBox } from 'src/components';

const Container = styled.div({
  display: 'flex',
  marginTop: '20px',
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

const CommentContainer = styled.div({
  width: '750px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  height: '8rem',
  padding: '.5rem'
});

const UserInfomation = styled.div({
  width: '100%',
  display: 'flex',
  height: '1.5rem',
  alignItems: 'center'
});

const CommentContent = styled.p({
  display: 'flex',
  alignItems: 'center',
  width: '95%',
  height: '5rem',
  marginTop: '.5rem',
  padding: '.5rem',
  borderRadius: '8px',
  backgroundColor: '#efefef'
});

export default function Comment() {
  return (
    <Container>
      <Title>Comments</Title>
      <BorderBox isTransform={false} styles={{ margin: '1rem 0 0' }}>
        <CommentContainer>
          <UserInfomation>덧글 단 사람 정보 + 삭제버튼?</UserInfomation>
          <CommentContent>Hi~</CommentContent>
        </CommentContainer>
      </BorderBox>
      <BorderBox isTransform={false} styles={{ margin: '1rem 0 0' }}>
        <CommentContainer>
          <UserInfomation>덧글 단 사람 정보 + 삭제버튼?</UserInfomation>
          <CommentContent>좋은 글이였습니다!</CommentContent>
        </CommentContainer>
      </BorderBox>
      <BorderBox isTransform={false} styles={{ margin: '1rem 0 0' }}>
        <CommentContainer>
          <UserInfomation>덧글 단 사람 정보 + 삭제버튼?</UserInfomation>
          <CommentContent>으으...</CommentContent>
        </CommentContainer>
      </BorderBox>
    </Container>
  );
}
