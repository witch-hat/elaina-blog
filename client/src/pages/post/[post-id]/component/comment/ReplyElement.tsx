import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { CommentBox } from 'src/components';
import { FormatUnifier } from 'src/utils';
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
}

export function ReplyElement(props: Props) {
  const createdAt = new Date(props.reply.createdAt);

  return (
    <ReplyContainer key={`${createdAt}`}>
      <CommentBox isLogin={props.isLogin} comment={props.reply} author={props.author} />
    </ReplyContainer>
  );
}
