import React from 'react';
import styled from 'styled-components';

import { CommentBox } from 'src/components';
import { Reply } from 'src/query/comment';

const ReplyContainer = styled.div({
  width: '95%',
  margin: '.5rem',
  padding: '.5rem',
  borderRadius: '12px',
  backgroundColor: 'rgba(0,0,0,.01)'
});

interface Props {
  reply: Reply;
  isLogin: boolean;
  author: string;
  commentIndex: number;
  replyIndex: number;
  setDeletedReplyIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function ReplyElement(props: Props) {
  const createdAt = new Date(props.reply.createdAt);

  return (
    <ReplyContainer key={`${createdAt}`}>
      <CommentBox
        isLogin={props.isLogin}
        isCommentFromAdmin={props.reply.isAdmin}
        comment={props.reply}
        author={props.author}
        commentIndex={props.commentIndex}
        isReply
        replyIndex={props.replyIndex}
        setDeletedReplyIndex={props.setDeletedReplyIndex}
      />
    </ReplyContainer>
  );
}
