import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { BorderBox, FocusWrapper } from 'src/components';
import CommentEditor from './CommentEditor';
import { Reply, Comment } from 'src/query/comment';
import { FormatUnifier } from 'src/utils';
import { ReplyElement } from './ReplyElement';

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

const MenuIconButton = styled.div({
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

const MenuContainer = styled.div({
  position: 'relative'
});

const MenuListWrapper = styled.div({
  position: 'absolute',
  top: '32.6px',
  right: 0,
  zIndex: 1
});

const MenuList = styled.div({
  backgroundColor: '#eee',
  borderRadius: '.3rem'
});

const MenuButton = styled.p<{ danger?: boolean }>((props) => ({
  display: 'block',
  padding: '.5rem',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  color: props.danger ? '#dd0000' : 'inherit',
  '&:hover': {
    backgroundColor: '#ddd'
  }
}));

interface Props {
  comment: Comment;
  isLogin: boolean;
}

export default function CommentElement(props: Props) {
  const [isShowingReply, setIsShowingReply] = useState(false);
  const [isAddReply, setIsAddReply] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createdTime = new Date(props.comment.createdAt);
  const dateFormatHelper = new FormatUnifier.FormatDate();

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
                <p>{dateFormatHelper.getFullFormatDate(createdTime)}</p>
              </Time>
            </InformationContainer>
            {props.isLogin && (
              <MenuContainer>
                <MenuIconButton onClick={() => setIsOpenMenu(!isOpenMenu)}>
                  <FontAwesomeIcon icon={faEllipsisV} />
                </MenuIconButton>
                <MenuListWrapper>
                  <FocusWrapper visible={isOpenMenu} onClickOutside={() => setIsOpenMenu(false)}>
                    <MenuList>
                      <MenuButton danger onClick={() => setIsModalOpen(true)}>
                        Delete
                      </MenuButton>
                    </MenuList>
                  </FocusWrapper>
                </MenuListWrapper>
              </MenuContainer>
            )}
          </DetailsContainer>
          <CommentContent>{props.comment.comment}</CommentContent>
          <ReplyButtonContainer>
            <ReplyButton onClick={() => setIsShowingReply(!isShowingReply)}>{`${
              isShowingReply ? 'Hide' : `Show ${props.comment.replies.length}`
            } Reply `}</ReplyButton>
            <ReplyButton onClick={() => setIsAddReply(!isAddReply)}>{isAddReply ? 'Cancel' : `Add Reply`}</ReplyButton>
          </ReplyButtonContainer>
          {isAddReply ? <CommentEditor isLogin={props.isLogin} /> : null}
          {isShowingReply
            ? props.comment.replies.map((reply: Reply) => {
                return <ReplyElement reply={reply} isLogin={props.isLogin} />;
              })
            : null}
        </CommentContainer>
      </BorderBox>
    </div>
  );
}
