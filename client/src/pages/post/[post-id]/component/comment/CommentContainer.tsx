import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CommentElement from './CommentElement';
import CommentEditor from './CommentEditor';
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
  author: string;
}

export default function CommentContainer(props: Props) {
  const [newComment, setNewComment] = useState<Comment>();

  if (newComment) {
    props.comment.comments.push(newComment);
    props.comment.count += 1;
  }

  return (
    <Container>
      <Title>Comments</Title>
      <CommentEditor isLogin={props.isLogin} setNewComment={setNewComment} />
      <div style={{ width: '100%' }}>
        <Counter>{`덧글 수: ${props.comment.count}개`}</Counter>
        {props.comment.comments.map((comment: Comment) => {
          return (
            <CommentElement
              key={`${comment.createdAt}`}
              comment={comment}
              isLogin={props.isLogin}
              author={props.author}
              // count={commentCount}
              // setCount={setCommentCount}
            />
          );
        })}
      </div>
    </Container>
  );
}
