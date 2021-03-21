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
  index: number;
}

export function ReplyElement(props: Props) {
  const createdAt = new Date(props.reply.createdAt);

  return (
    <ReplyContainer key={`${createdAt}`}>
      <CommentBox isLogin={props.isLogin} comment={props.reply} author={props.author} index={props.index} isReply />
    </ReplyContainer>
  );
}
