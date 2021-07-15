import React from 'react';
import styled from 'styled-components';

import { Reply } from 'src/query/comment';

import { ReplyBox } from './box/ReplyBox';

const ReplyContainer = styled.div<{ isAdmin: boolean }>((props) => ({
  width: '95%',
  margin: '.5rem',
  padding: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.isAdmin ? props.theme.adminReplyColor : 'rgba(0, 0, 0, .01)'
}));

interface Props {
  reply: Reply;
  postId: number;
  isLogin: boolean;
  author: string;
  commentIndex: number;
  replyIndex: number;
  setDeletedReplyIndex: React.Dispatch<React.SetStateAction<number>>;
}

export function ReplyElement(props: Props) {
  const createdAt = new Date(props.reply.createdAt);

  return (
    <ReplyContainer key={`${createdAt}`} isAdmin={props.reply.isAdmin}>
      <ReplyBox
        isLogin={props.isLogin}
        postId={props.postId}
        isCommentFromAdmin={props.reply.isAdmin}
        comment={props.reply}
        author={props.author}
        commentIndex={props.commentIndex}
        replyIndex={props.replyIndex}
        setDeletedReplyIndex={props.setDeletedReplyIndex}
      />
    </ReplyContainer>
  );
}
