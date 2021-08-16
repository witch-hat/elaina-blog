import React, { useState } from 'react';
import styled from 'styled-components';
import { cloneDeep } from 'lodash';

import { CommentContainerType, CommentType } from 'src/query/comment';
import { trans, Lang } from 'src/resources/languages';

import { CommentWriter } from './writer/CommentWriter';
import { CommentElement } from './CommentElement';

const Container = styled.section({
  display: 'flex',
  width: '100%',
  minHeight: '20rem',
  padding: '.5rem 2rem',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  '@media screen and (max-width: 767px)': {
    padding: '.5rem'
  }
});

const Title = styled.p({
  width: '100%',
  marginBottom: '.5rem',
  fontSize: '1.25rem',
  fontWeight: 'bold',
  userSelect: 'none'
});

const StyleHr = styled.hr((props) => ({
  width: '100%',
  border: 'none',
  margin: '0',
  borderBottom: `2px solid ${props.theme.borderColor}`
}));

const Comments = styled.div({
  width: 'calc(100% - 6rem)'
});

interface Props {
  categoryId: number;
  postId: number;
  comments: CommentContainerType;
  isLogin: boolean;
  author: string;
}

export function CommentContainer(props: Props) {
  const [commentContainer, setCommentContainer] = useState<CommentContainerType>(props.comments);

  function addNewComment(response: CommentContainerType) {
    setCommentContainer(response);
  }

  function editComment(editIndex: number, comment: string) {
    const comments = cloneDeep(commentContainer.comments);
    comments[editIndex].comment = comment;

    setCommentContainer({
      _id: commentContainer._id,
      comments,
      count: commentContainer.count
    });
  }

  function deleteComment(deleteIndex: number) {
    const decreaseCount = commentContainer.comments[deleteIndex].replies.length + 1;
    const filteredComment = commentContainer.comments.filter((comment, index) => index !== deleteIndex);

    setCommentContainer({
      _id: commentContainer._id,
      comments: filteredComment,
      count: commentContainer.count - decreaseCount
    });
  }

  return (
    <Container>
      <Title>{trans(Lang.Comments)}</Title>
      <StyleHr />
      <CommentWriter
        isLogin={props.isLogin}
        onAddComment={addNewComment}
        categoryId={props.categoryId}
        postId={props.postId}
        commentIndex={commentContainer.comments.length + 1}
      />
      <Comments>
        {commentContainer.comments.length ? (
          commentContainer.comments.map((comment: CommentType, index: number) => {
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
                editComment={editComment}
                deleteComment={deleteComment}
                setCommentContainer={setCommentContainer}
              />
            );
          })
        ) : (
          <div>No Comments...</div>
        )}
      </Comments>
    </Container>
  );
}
