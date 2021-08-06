import { useState } from 'react';
import styled from 'styled-components';
import BottomMenu from './BottomMenu';

const Container = styled.div({
  width: '100%',
  margin: '1rem 0',
  borderRadius: '.5rem',
  backgroundColor: 'transparent'
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

interface Props {
  commentContent: string;
  isCommentFromAdmin: boolean;
  onEdit: (commentContent: string, password: string) => Promise<void>;
  endEdit: () => void;
  onCancel: () => void;
}

export function CommentEditor(props: Props) {
  const [editingCommentContent, setEditingCommentContent] = useState(props.commentContent);
  const [password, setPassword] = useState('');

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
      <BottomMenu
        firstButton={{
          message: 'Cancel',
          onClick: onCancel
        }}
        secondButton={{
          message: 'Edit',
          onClick: () => onEdit()
        }}
        isCommentFromAdmin={props.isCommentFromAdmin}
        updatePassword={(password: string) => setPassword(password)}
      />
    </Container>
  );
}
