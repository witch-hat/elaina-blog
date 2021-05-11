import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Comments, Comment } from 'src/query/comment';
import { trans, Lang } from 'src/resources/languages';

import { CommentWriter } from './CommentWriter';
import { CommentElement } from './CommentElement';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  margin: '20px 0',
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
  categoryId: number;
  postId: number;
  comments: Comments;
  isLogin: boolean;
  author: string;
}

export function CommentContainer(props: Props) {
  const [commentContainer, setCommentContainer] = useState<Comments>(props.comments);
  const [newComment, setNewComment] = useState<Comment>();
  const [deletedIndex, setDeletedIndex] = useState(-1);

  useEffect(() => {
    setCommentContainer(props.comments);
  }, [props.comments]);

  useEffect(() => {
    if (newComment && commentContainer) {
      setCommentContainer({
        ...commentContainer,
        comments: [...commentContainer.comments, newComment],
        count: commentContainer.count + 1
      });
    }
  }, [newComment]);

  useEffect(() => {
    if (deletedIndex > -1 && commentContainer) {
      const decreaseCount = commentContainer.comments[deletedIndex].replies.length + 1;
      const filteredComment = commentContainer.comments.filter((comment, index) => index !== deletedIndex);
      setCommentContainer({
        ...commentContainer,
        comments: [...filteredComment],
        count: commentContainer.count - decreaseCount
      });
    }
    setDeletedIndex(-1);
  }, [deletedIndex]);

  return (
    <Container>
      <Title>{trans(Lang.Comments)}</Title>
      <CommentWriter
        isLogin={props.isLogin}
        buttonText={trans(Lang.Save)}
        setNewComment={setNewComment}
        categoryId={props.categoryId}
        postId={props.postId}
        commentIndex={commentContainer.comments.length + 1}
      />
      <div style={{ width: '100%' }}>
        <Counter>{`덧글 수: ${commentContainer.count}개`}</Counter>
        {commentContainer &&
          commentContainer.comments.map((comment: Comment, index: number) => {
            return (
              <CommentElement
                key={index}
                comment={comment}
                isLogin={props.isLogin}
                author={props.author}
                isCommentFromAdmin={comment.isAdmin}
                categoryId={props.categoryId}
                postId={props.postId}
                commentIndex={index}
                count={commentContainer.count}
                commentContainer={commentContainer}
                setCommentContainer={setCommentContainer}
                setDeletedIndex={setDeletedIndex}
              />
            );
          })}
      </div>
    </Container>
  );
}
