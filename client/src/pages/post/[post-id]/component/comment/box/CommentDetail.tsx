import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

import { FormatUnifier } from 'src/utils';
import { CommentType, ReplyType } from 'src/query/comment';

const InformationContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  fontSize: '.8rem',
  '@media screen and (max-width: 767px)': {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});

const Author = styled.div({
  display: 'flex',
  marginRight: '.7rem',
  alignItems: 'center',
  '@media screen and (max-width: 767px)': {
    margin: '0 0 .2rem'
  }
});

const Time = styled.span({
  display: 'flex',
  alignItems: 'center',
  marginRight: '.7rem'
});

const AuthorCommentSign = styled.div<{isAdmin:boolean}>((props)=>({
  display: props.isAdmin? 'block':'none',
  padding: '.1rem .5rem',
  backgroundColor: '#333',
  color: '#fff',
  overflow: 'hidden',
  borderRadius: '.5rem'
}));

interface Props {
  comment: CommentType | ReplyType;
  author: string;
}

function CommentDetail(props: Props) {
  const createdAt = new Date(props.comment.createdAt);

  return (
    <InformationContainer>
      <Author>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '.5rem' }} />
        <p>{props.comment.isAdmin ? props.author : props.comment.username}</p>
      </Author>
      <Time>
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '.5rem' }} />
        <p>{FormatUnifier.getFullFormatDate(createdAt)}</p>
      </Time>
      <AuthorCommentSign isAdmin={props.comment.isAdmin}>AUTHOR</AuthorCommentSign>
    </InformationContainer>
  );
}

export const MemoizedCommentDetail = React.memo(CommentDetail);
