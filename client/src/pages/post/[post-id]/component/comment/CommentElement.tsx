import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { BorderBox } from 'src/components';
import CommentEditor from './CommentEditor';
import { Reply, Comment } from 'src/query/comment';

const CommentContainer = styled.div({
  width: '98%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '8rem',
  padding: '.5rem'
});

const DetailsContainer = styled.div({
  display: 'flex',
  width: '100%',
  height: '2.1rem',
  justifyContent: 'space-between',
  '@media screen and (max-width: 767px)': {
    margin: '0 0 .2rem'
  }
});

const InformationContainer = styled.div({
  display: 'flex',
  fontSize: '.8rem',
  alignItems: 'center',
  '@media screen and (max-width: 767px)': {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});

const Author = styled.div({
  marginRight: '.7rem',
  display: 'flex',
  alignItems: 'center',
  '@media screen and (max-width: 767px)': {
    margin: '0 0 .2rem'
  }
});

const Time = styled.span({
  display: 'flex',
  alignItems: 'center'
});

const MenuButton = styled.div({
  fontSize: '.8rem',
  padding: '.5rem .8rem',
  cursor: 'pointer',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#eee'
  }
});

const CommentContent = styled.p({
  margin: '2rem 0',
  display: 'flex',
  alignItems: 'center',
  width: '100%'
});

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

const ReplyContainer = styled.div({
  width: '95%',
  margin: '.5rem',
  padding: '.5rem',
  borderRadius: '12px',
  backgroundColor: 'rgba(0,0,0,.01)'
});

interface Props {
  comment: Comment;
}

export default function CommentElement(props: Props) {
  const [isShowingReply, setIsShowingReply] = useState(false);
  const [isAddReply, setIsAddReply] = useState(false);
  const createdTime = new Date(props.comment.createdAt);

  return (
    <div>
      <BorderBox isTransform={false} styles={{ margin: '1rem 0 0', width: '100%' }}>
        <CommentContainer>
          <DetailsContainer>
            <InformationContainer>
              <Author>
                <FontAwesomeIcon icon={faUser} style={{ marginRight: '.5rem' }} />
                <p>{props.comment.username}</p>
              </Author>
              <Time>
                <FontAwesomeIcon icon={faClock} style={{ marginRight: '.5rem' }} />
                <p>
                  {`${createdTime.getFullYear()}.${
                    createdTime.getMonth() + 1
                  }.${createdTime.getDate()} ${createdTime.getHours()}:${createdTime.getMinutes()}`}
                </p>
              </Time>
            </InformationContainer>
            <MenuButton>
              <FontAwesomeIcon icon={faEllipsisV} />
            </MenuButton>
          </DetailsContainer>
          <CommentContent>{props.comment.comment}</CommentContent>
          <ReplyButtonContainer>
            <ReplyButton onClick={() => setIsShowingReply(!isShowingReply)}>{`${isShowingReply ? 'Hide' : 'Show'} Reply`}</ReplyButton>
            <ReplyButton onClick={() => setIsAddReply(!isAddReply)}>{isAddReply ? 'Cancel' : `Add Reply`}</ReplyButton>
          </ReplyButtonContainer>
          {isAddReply ? <CommentEditor /> : null}
          {isShowingReply
            ? props.comment.replies.map((reply: Reply) => {
                const replyCreatedTime = new Date(reply.createdAt);
                return (
                  <ReplyContainer key={`${reply.createdAt}`}>
                    <DetailsContainer>
                      <InformationContainer>
                        <Author>
                          <FontAwesomeIcon icon={faUser} style={{ marginRight: '.5rem' }} />
                          <p>{reply.username}</p>
                        </Author>
                        <Time>
                          <FontAwesomeIcon icon={faClock} style={{ marginRight: '.5rem' }} />
                          <p>{`${replyCreatedTime.getFullYear()}.${
                            replyCreatedTime.getMonth() + 1
                          }.${replyCreatedTime.getDate()} ${replyCreatedTime.getHours()}:${replyCreatedTime.getMinutes()}`}</p>
                        </Time>
                      </InformationContainer>
                      <MenuButton>
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </MenuButton>
                    </DetailsContainer>
                    <CommentContent>{reply.comment}</CommentContent>
                  </ReplyContainer>
                );
              })
            : null}
        </CommentContainer>
      </BorderBox>
    </div>
  );
}
