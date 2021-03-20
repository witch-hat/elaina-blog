import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

import { FocusWrapper } from 'src/components';
import { FormatUnifier } from 'src/utils';
import { Reply } from 'src/query/comment';

const ReplyContainer = styled.div({
  width: '95%',
  margin: '.5rem',
  padding: '.5rem',
  borderRadius: '12px',
  backgroundColor: 'rgba(0,0,0,.01)'
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
  reply: Reply;
  isLogin: boolean;
}

export function ReplyElement(props: Props) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const createdAt = new Date(props.reply.createdAt);
  const dateFormatHelper = new FormatUnifier.FormatDate();

  return (
    <ReplyContainer key={`${createdAt}`}>
      <DetailsContainer>
        <InformationContainer>
          <Author>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '.5rem' }} />
            <p>{props.reply.username}</p>
          </Author>
          <Time>
            <FontAwesomeIcon icon={faClock} style={{ marginRight: '.5rem' }} />
            <p>{dateFormatHelper.getFullFormatDate(createdAt)}</p>
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
      <CommentContent>{props.reply.comment}</CommentContent>
    </ReplyContainer>
  );
}
