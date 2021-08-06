import React, { useState } from 'react';
import styled from 'styled-components';

import { CommentType, ReplyType } from 'src/query/comment';

import { CommentEditor } from './CommentEditor';
import { MemoizedCommentDetail } from './CommentDetail';
import { CommentMenu } from './CommentMenu';
import BottomMenu from './BottomMenu';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  padding: '.5rem',
  margin: '.5rem',
  borderRadius: '.5rem',
  justifyContent: 'center',
  flexDirection: 'column'
});

const DetailsContainer = styled.div({
  display: 'flex',
  width: '100%',
  height: 'max-content',
  justifyContent: 'space-between',
  fontSize: '.8rem',
  '@media screen and (max-width: 767px)': {
    margin: '0 0 .2rem'
  }
});

const CommentContent = styled.p({
  width: '95%',
  margin: '2rem 1rem',
  overflowWrap: 'anywhere',
  alignItems: 'center'
});

interface Props {
  isLogin: boolean;
  comment: CommentType | ReplyType;
  author: string;
  onEdit: (commentContent: string, password: string) => Promise<void>;
  onDelete: (password: string) => Promise<void>;
  children?: JSX.Element;
}

export function CommentBoxLayout(props: Props) {
  const [mode, setMode] = useState('content'); // mode 'content', 'edit' or 'delete'
  const [password, setPassword] = useState('');

  const onAdminEditClick = () => setMode('edit');

  const onUserEditClick = () => setMode('edit');

  const onDeleteMenuClick = () => setMode('delete');

  const cancelEdit = () => setMode('content');

  const endEdit = () => setMode('content');

  const cancelDelete = () => setMode('content');

  async function onDelete() {
    await props.onDelete(password);

    setPassword('');
    cancelDelete();
  }

  return (
    <Container>
      <DetailsContainer>
        <MemoizedCommentDetail comment={props.comment} author={props.author} />
        {(props.isLogin || !props.comment.isAdmin) && (
          <CommentMenu
            isLogin={props.isLogin}
            isCommentFromAdmin={props.comment.isAdmin}
            onAdminEditClick={onAdminEditClick}
            onUserEditClick={onUserEditClick}
            onDeleteMenuClick={onDeleteMenuClick}
          />
        )}
      </DetailsContainer>
      {mode === 'edit' ? (
        <CommentEditor
          commentContent={props.comment.comment}
          isCommentFromAdmin={props.comment.isAdmin}
          onEdit={props.onEdit}
          endEdit={endEdit}
          onCancel={cancelEdit}
        />
      ) : (
        <CommentContent>{props.comment.comment}</CommentContent>
      )}
      {mode === 'delete' ? (
        <BottomMenu
          onFirstButton={cancelDelete}
          onSecondButton={onDelete}
          isCommentFromAdmin={props.comment.isAdmin}
          updatePassword={(password: string) => setPassword(password)}
          firstMessage='Cancel'
          secondMessage='Delete'
        />
      ) : (
        props.children
      )}
    </Container>
  );
}
