import React from 'react';
import styled from 'styled-components';

import { BorderBox, InputBox } from 'src/components';
import Comment from './Comment';
import CommentEditor from './CommentEditor';

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

const Counter = styled.div({
  width: '100%',
  fontSize: '1.15rem',
  fontWeight: 'bold'
});

export default function CommentContainer() {
  return (
    <Container>
      <Title>Comments</Title>
      <CommentEditor />
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
