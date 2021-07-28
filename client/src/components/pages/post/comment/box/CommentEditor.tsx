import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div({
  width: '100%',
  margin: '1rem 0',
  borderRadius: '.5rem',
  backgroundColor: '#eee'
});

const Editor = styled.textarea({
  display: 'block',
  width: '100%',
  minHeight: '4rem',
  padding: '.5rem',
  border: '1px solid #ddd',
  borderRadius: '.5rem',
  backgroundColor: '#fff',
  outline: 'none',
  cursor: 'text',
  resize: 'none',
  overflow: 'auto'
});

const EditMenuContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end'
});

const EditButtonItem = styled.button({
  padding: '.5rem',
  margin: '.5rem 0 .5rem .5rem',
  borderRadius: '.5rem'
});

interface Props {
  commentContent: string;
  isCommentFromAdmin: boolean;
  onEdit: (commentContent: string, password: string) => Promise<void>;
  endEdit: () => void;
  onCancel: () => void;
}

export function CommentEditor(props: Props) {
  const [password, setPassword] = useState('');
  const [editingCommentContent, setEditingCommentContent] = useState(props.commentContent);

  async function onEdit() {
    if (editingCommentContent === props.commentContent) {
      props.onCancel();
      return;
    }

    try {
      await props.onEdit(editingCommentContent, password);
    } catch (err) {
      setEditingCommentContent(props.commentContent);
      alert(err.message);
    }

    props.endEdit();
  }

  function onCancel() {
    setEditingCommentContent(props.commentContent);
    props.onCancel();
  }

  return (
    <Container>
      <Editor
        role='textbox'
        value={editingCommentContent}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setEditingCommentContent(e.target.value);
        }}
      />
      <EditMenuContainer>
        {props.isCommentFromAdmin || (
          <input
            placeholder='password'
            type='password'
            minLength={8}
            maxLength={20}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}
        <EditButtonItem onClick={() => onCancel()}>Cancel</EditButtonItem>
        <EditButtonItem onClick={async () => await onEdit()}>Edit</EditButtonItem>
      </EditMenuContainer>
    </Container>
  );
}
