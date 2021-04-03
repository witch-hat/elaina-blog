import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import CommentElement from './CommentElement';
import { CommentWriter } from 'src/components';
import { Comments, Comment } from 'src/query/comment';
import { trans, Lang } from 'src/resources/languages';

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
  comments: Comments;
  isLogin: boolean;
  author: string;
}

export default function CommentContainer(props: Props) {
  const [commentContainer, setCommentContainer] = useState<Comments | null>(null);
  const [newComment, setNewComment] = useState<Comment>();
  const [count, setCount] = useState(props.comments.count);
  const [deletedIndex, setDeletedIndex] = useState(-1);

  // This occurs renders twice...
  useEffect(() => {
    setCommentContainer(props.comments);
    setCount(props.comments.count);
  }, [props.comments]);

  useEffect(() => {
    if (newComment && commentContainer) {
      setCommentContainer({ ...commentContainer, comments: [...commentContainer.comments, newComment] });
      setCount(count + 1);
    }
  }, [newComment]);

  useEffect(() => {
    if (deletedIndex > -1 && commentContainer) {
      const decreaseCount = commentContainer.comments[deletedIndex].replies.length + 1;
      const filteredComment = commentContainer.comments.filter((comment, index) => index !== deletedIndex);
      setCommentContainer({ ...commentContainer, comments: [...filteredComment] });
      setCount(count - decreaseCount);
    }
    setDeletedIndex(-1);
  }, [deletedIndex]);

  return (
    <Container>
      <Title>{trans(Lang.Comments)}</Title>
      <CommentWriter isLogin={props.isLogin} setNewComment={setNewComment} />
      <div style={{ width: '100%' }}>
        <Counter>{`덧글 수: ${count}개`}</Counter>
        {commentContainer &&
          commentContainer.comments.map((comment: Comment, index: number) => {
            return (
              <CommentElement
                key={index}
                comment={comment}
                isLogin={props.isLogin}
                author={props.author}
                isCommentFromAdmin={comment.isAdmin}
                index={index}
                count={count}
                commentContainer={commentContainer}
                setCommentContainer={setCommentContainer}
                setDeletedIndex={setDeletedIndex}
                setCount={setCount}
              />
            );
          })}
      </div>
    </Container>
  );
}
