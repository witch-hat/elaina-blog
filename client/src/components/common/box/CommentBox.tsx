import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { FocusWrapper } from 'src/components';
import { Comment, DELETE_COMMENT, DELETE_REPLY, Reply } from 'src/query/comment';
import { ModalWrapper } from 'src/components';
import { FormatUnifier } from 'src/utils';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { theme } from 'src/styles';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';
import { InputBox } from './InputBox';
import { Lang, trans } from 'src/resources/languages';

const Container = styled.div({
  width: '100%',
  margin: '.5rem',
  padding: '.5rem',
  borderRadius: '12px'
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
  fontSize: '.875rem',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  wordBreak: 'keep-all',
  color: props.danger ? '#dd0000' : 'inherit',
  '&:hover': {
    backgroundColor: '#ddd'
  }
}));

const ModalContainer = styled.div((props) => ({
  width: '25rem',
  padding: '.5rem'
}));

const ModalParagraph = styled.p({
  width: '100%'
});

const Password = styled.div({
  margin: '.5rem 0',
  width: '60%'
});

const ModalButtonContainer = styled.div({
  display: 'flex',
  width: '100%',
  marginTop: '1rem',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

const ModalButton = styled.button<{ themeMode?: ThemeMode }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  borderRadius: '.5rem',
  marginLeft: '.5rem',
  backgroundColor: props.themeMode ? theme[props.themeMode].dangerButtonColor : 'inherit',
  color: props.themeMode ? theme[props.themeMode].dangerContentText : 'inherit'
}));

interface Props {
  isLogin: boolean;
  isCommentFromAdmin: boolean;
  comment: Comment | Reply;
  author: string;
  commentIndex: number;
  children?: JSX.Element;
  isReply?: boolean;
  replyIndex?: number;
  setDeletedIndex?: React.Dispatch<React.SetStateAction<number>>;
  setDeletedReplyIndex?: React.Dispatch<React.SetStateAction<number>>;
}

export function CommentBox(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [deleteReply] = useMutation(DELETE_REPLY);
  const createdAt = new Date(props.comment.createdAt);
  const dateFormatHelper = new FormatUnifier.FormatDate();
  const client = useApollo();
  const router = useRouter();

  async function handleDeleteComment() {
    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isAuth;
    const _id = +router.query['post-id'];
    let deleteResponse;

    // Admin can delete all comments
    if (isAuth) {
      deleteResponse = await deleteComment({
        variables: {
          _id,
          index: props.commentIndex
        }
      });
    }
    // common users can delete only their comment
    else {
      deleteResponse = await deleteComment({
        variables: {
          _id,
          index: props.commentIndex,
          password
        }
      });
    }

    if (deleteResponse.data.deleteComment.isSuccess && props.setDeletedIndex) {
      props.setDeletedIndex(props.commentIndex);
    } else {
      alert(deleteResponse.data.deleteComment.errorMsg);
    }
  }

  async function handleDeleteReply() {
    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isAuth;
    const _id = +router.query['post-id'];
    let deleteResponse;

    // Admin can delete all replies
    if (isAuth) {
      deleteResponse = await deleteReply({
        variables: {
          _id,
          commentIndex: props.commentIndex,
          replyIndex: props.replyIndex
        }
      });
    }
    // common users can delete only their reply
    else {
      deleteResponse = await deleteReply({
        variables: {
          _id,
          commentIndex: props.commentIndex,
          replyIndex: props.replyIndex,
          password
        }
      });
    }

    if (deleteResponse.data.deleteReply.isSuccess && props.setDeletedReplyIndex) {
      (props.replyIndex as number) > -1 && props.setDeletedReplyIndex(props.replyIndex as number);
    } else {
      alert(deleteResponse.data.deleteReply.errorMsg);
    }
  }

  return (
    <Container>
      <DetailsContainer>
        <InformationContainer>
          <Author>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '.5rem' }} />
            <p>{props.comment.isAdmin ? props.author : props.comment.username}</p>
          </Author>
          <Time>
            <FontAwesomeIcon icon={faClock} style={{ marginRight: '.5rem' }} />
            <p>{dateFormatHelper.getFullFormatDate(createdAt)}</p>
          </Time>
        </InformationContainer>
        {(props.isLogin || !props.isCommentFromAdmin) && (
          <MenuContainer>
            <MenuIconButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <FontAwesomeIcon icon={faEllipsisV} />
            </MenuIconButton>
            <MenuListWrapper>
              <FocusWrapper visible={isMenuOpen} onClickOutside={() => setIsMenuOpen(false)}>
                <MenuList>
                  {/* admin인경우: 자기것만 edit, 나머지는 edit 버튼 X, admin 아닌경우 edit 버튼 O */}
                  {props.isLogin ? (
                    props.comment.isAdmin && <MenuButton onClick={() => {}}>{trans(Lang.Edit)}</MenuButton>
                  ) : (
                    <MenuButton onClick={() => {}}>{trans(Lang.Edit)}</MenuButton>
                  )}
                  <MenuButton
                    danger
                    onClick={() => {
                      setIsModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    {trans(Lang.Delete)}
                  </MenuButton>
                </MenuList>
              </FocusWrapper>
            </MenuListWrapper>
          </MenuContainer>
        )}
      </DetailsContainer>
      <CommentContent>{props.comment.comment}</CommentContent>
      {props.children}
      <ModalWrapper visible={isModalOpen}>
        <ModalContainer>
          <ModalParagraph>{props.isLogin ? '정말 삭제하시겠습니까?' : '비밀번호를 입력해주세요'}</ModalParagraph>
          {props.isLogin || (
            <Password>
              <InputBox
                id='comment-pw-auth'
                type='password'
                placeholder='Password'
                maxLength={12}
                minLength={4}
                styles={{ width: '100%' }}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </Password>
          )}
          <ModalButtonContainer>
            <ModalButton
              onClick={() => {
                setIsModalOpen(false);
                if (props.isReply) {
                  handleDeleteReply();
                } else {
                  handleDeleteComment();
                }
              }}
              themeMode={themeMode}
            >
              {props.isLogin ? '예' : '삭제'}
            </ModalButton>
            <ModalButton onClick={() => setIsModalOpen(false)}>{props.isLogin ? '아니요' : '취소'}</ModalButton>
          </ModalButtonContainer>
        </ModalContainer>
      </ModalWrapper>
    </Container>
  );
}
