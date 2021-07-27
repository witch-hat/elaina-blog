import React from 'react';
import styled from 'styled-components';

import { ReplyType } from 'src/query/comment';

import { ReplyBox } from './box/ReplyBox';

const ReplyContainer = styled.div<{ isAdmin: boolean }>({
  width: '100%',
  margin: '.5rem 0',
  padding: '.5rem',
  borderLeft: '3px solid #727272'
});

interface Props {
  reply: ReplyType;
  postId: number;
  isLogin: boolean;
  author: string;
  commentIndex: number;
  replyIndex: number;
  editReply: (index: number, reply: string) => void;
  deleteReply: (index: number) => void;
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
        editReply={props.editReply}
        deleteReply={props.deleteReply}
      />
    </ReplyContainer>
  );
}
