import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';

import { Comment, Reply } from 'src/query/comment';

import { CommentEditor } from './CommentEditor';
import { MemoizedCommentDetail } from './CommentDetail';
import { CommentMenu } from './CommentMenu';

interface ModalProps {
  visible: boolean;
  isLogin: boolean;
  onDelete: (password: string) => Promise<void>;
  onCancel: () => void;
}

const DynamicDeleteModal = dynamic<ModalProps>(() => import('./DeleteModal').then((mod) => mod.DeleteModal));

const Container = styled.div({
  width: '100%',
  padding: '.5rem',
  margin: '.5rem',
  borderRadius: '.5rem'
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
  display: 'flex',
  width: '100%',
  margin: '2rem 0',
  alignItems: 'center'
});

interface Props {
  isLogin: boolean;
  comment: Comment | Reply;
  author: string;
  onEdit: (commentContent: string, password: string) => Promise<void>;
  onDelete: (password: string) => Promise<void>;
  children?: JSX.Element;
}

export function CommentBoxLayout(props: Props) {
  const [commentContent, setCommentContent] = useState<string>(props.comment.comment);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAdminCommentEdit, setIsAdminCommentEdit] = useState(false);
  const [isUserCommentEdit, setIsUserCommentEdit] = useState(false);

  const onAdminEditClick = () => setIsAdminCommentEdit(true);

  const onUserEditClick = () => setIsUserCommentEdit(true);

  const onDeleteMenuClick = () => setIsModalOpen(true);

  const cancelEdit = () => {
    isAdminCommentEdit ? setIsAdminCommentEdit(false) : setIsUserCommentEdit(false);
    setCommentContent(props.comment.comment);
  };

  const endEdit = () => {
    isAdminCommentEdit ? setIsAdminCommentEdit(false) : setIsUserCommentEdit(false);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
  };

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
      {isAdminCommentEdit || isUserCommentEdit ? (
        <CommentEditor
          commentContent={commentContent}
          isCommentFromAdmin={props.comment.isAdmin}
          onEdit={props.onEdit}
          endEdit={endEdit}
          onCancel={cancelEdit}
        />
      ) : (
        <CommentContent>{commentContent}</CommentContent>
      )}
      {props.children}
      <DynamicDeleteModal visible={isModalOpen} isLogin={props.isLogin} onDelete={props.onDelete} onCancel={cancelDelete} />
    </Container>
  );
}
