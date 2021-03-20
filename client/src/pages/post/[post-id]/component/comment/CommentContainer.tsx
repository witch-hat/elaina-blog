import React from 'react';
import styled from 'styled-components';

import { BorderBox, InputBox } from 'src/components';
import CommentElement from './CommentElement';
import CommentEditor from './CommentEditor';
import { ThemeMode } from 'src/redux/common/type';
import { Comments, Comment } from 'src/query/comment';

const Container = styled.section({
  display: 'flex',
  width: '100%',
  marginTop: '20px',
  padding: '.5rem 1.5rem',
  flexDirection: 'column',
  jusitfyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '20rem',
  '@media screen and (max-width: 767px)': {
    padding: '.5rem'
  }
});

const Title = styled.span({
  display: 'block',
  width: '100%',
  fontSize: '1.4rem',
  fontWeight: 'bold'
});

const Counter = styled.p({
  width: '100%',
  fontSize: '1.15rem',
  fontWeight: 'bold'
});

interface Props {
  comment: Comments;
  isLogin: boolean;
}

export default function CommentContainer(props: Props) {
  console.log(props.comment);
  return (
    <Container>
      <Title>Comments</Title>
      <CommentEditor isLogin={props.isLogin} />
      <div style={{ width: '100%' }}>
        <Counter>{`덧글 수: ${props.comment.count}개`}</Counter>
        {props.comment.comments.map((comment: Comment) => {
          return <CommentElement key={`${comment.createdAt}`} comment={comment} isLogin={props.isLogin} />;
        })}
      </div>
    </Container>
  );
}
