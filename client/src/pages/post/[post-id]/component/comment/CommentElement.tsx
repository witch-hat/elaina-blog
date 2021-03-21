import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { BorderBox, FocusWrapper, CommentBox } from 'src/components';
import CommentEditor from './CommentEditor';
import { Reply, Comment } from 'src/query/comment';
import { FormatUnifier } from 'src/utils';
import { ReplyElement } from './ReplyElement';

const ReplyButtonContainer = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const ReplyButton = styled.span({
  padding: '0 .5rem',
  textAlign: 'right',
  fontSize: '.8rem',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    textDecoration: 'solid underline #1f2f3f 1px'
  }
});

interface Props {
  comment: Comment;
  isLogin: boolean;
  author: string;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function CommentElement(props: Props) {
  const [isShowingReply, setIsShowingReply] = useState(false);
  const [isAddReply, setIsAddReply] = useState(false);
  const [newReply, setNewReply] = useState<Reply>();

  if (newReply) {
    props.comment.replies.push(newReply);
    props.setCount(props.count + 1);
  }

  return (
    <div>
      <BorderBox isTransform={false} styles={{ margin: '1rem 0 0', width: '100%' }}>
        <CommentBox isLogin={props.isLogin} comment={props.comment} author={props.author}>
          <>
            <ReplyButtonContainer>
              <ReplyButton onClick={() => setIsShowingReply(!isShowingReply)}>{`${
                isShowingReply ? 'Hide' : `Show ${props.comment.replies.length}`
              } Reply `}</ReplyButton>
              <ReplyButton onClick={() => setIsAddReply(!isAddReply)}>{isAddReply ? 'Cancel' : `Add Reply`}</ReplyButton>
            </ReplyButtonContainer>
            {isAddReply ? <CommentEditor isLogin={props.isLogin} setNewReply={setNewReply} /> : null}
            {isShowingReply
              ? props.comment.replies.map((reply: Reply) => {
                  return <ReplyElement reply={reply} isLogin={props.isLogin} author={props.author} />;
                })
              : null}
          </>
        </CommentBox>
      </BorderBox>
    </div>
  );
}
