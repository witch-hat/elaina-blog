import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { DropDownMenu, ModalWrapper, NoRefInputBox } from 'src/components';
import { Comment, DELETE_COMMENT, DELETE_REPLY, EDIT_COMMENT, EDIT_REPLY, Reply } from 'src/query/comment';
import { DELETE_COMMENT_LOG } from 'src/query/comment-log';
import { FormatUnifier } from 'src/utils';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { theme } from 'src/styles';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';
import { Lang, trans } from 'src/resources/languages';

const Container = styled.div({
  width: '100%',
  padding: '.5rem',
  margin: '.5rem',
  borderRadius: '.5rem'
});

const DetailsContainer = styled.div({
  display: 'flex',
  width: '100%',
  height: 'max-content',
  justifyContent: 'space-between',
  fontSize: '.8rem',
  '@media screen and (max-width: 767px)': {
    margin: '0 0 .2rem'
  }
});

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
  alignItems: 'center'
});

const CommentContent = styled.p({
  display: 'flex',
  width: '100%',
  margin: '2rem 0',
  alignItems: 'center'
});

const MenuButton = styled.p<{ danger?: boolean }>((props) => ({
  display: 'block',
  padding: '.5rem',
  borderRadius: '.5rem',
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
  width: '60%',
  margin: '.5rem 0'
});

const ModalButtonContainer = styled.div({
  display: 'flex',
  width: '100%',
  marginTop: '1rem',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

const ModalButton = styled.button<{ danger?: boolean }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  marginLeft: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.danger ? props.theme.dangerButtonColor : 'inherit',
  color: props.danger ? props.theme.dangerContentText : 'inherit'
}));

const EditContainer = styled.div({
  width: '100%',
  margin: '1rem 0',
  borderRadius: '.5rem',
  backgroundColor: '#eee'
});

const CommentEditor = styled.span({
  display: 'block',
  width: '100%',
  minHeight: '4rem',
  padding: '.5rem',
  border: '1px solid #ddd',
  borderRadius: '.5rem',
  backgroundColor: '#fff',
  outline: 'none',
  cursor: 'text',
  resize: 'vertical',
  overflow: 'auto'
});

const EditMenuContainer = styled.div({
  display: 'flex',
  justifyContent: 'flex-end'
});

const EditButtonItem = styled.button({
  padding: '.5rem',
  margin: '.5rem 0 .5rem .5rem',
  borderRadius: '.5rem'
});

interface Props {
  isLogin: boolean;
  postId: number;
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
  const createdAt = new Date(props.comment.createdAt);
  // const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [commentContent, setCommentContent] = useState<string>(props.comment.comment);
  const [isAdminCommentEdit, setIsAdminCommentEdit] = useState(false);
  const [isUserCommentEdit, setIsUserCommentEdit] = useState(false);
  const router = useRouter();

  const client = useApollo();
  const [deleteReply] = useMutation(DELETE_REPLY);
  const [deleteComment] = useMutation(DELETE_COMMENT);
  const [editComment] = useMutation(EDIT_COMMENT);
  const [editReply] = useMutation(EDIT_REPLY);
  const [deleteCommentLog] = useMutation(DELETE_COMMENT_LOG);

  useEffect(() => {
    setCommentContent(props.comment.comment);
  }, [props.comment.comment]);

  async function handleDeleteComment() {
    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isAuth;
    const _id = +router.query['post-id'];

    // Admin can delete all comments
    if (isAuth) {
      try {
        await deleteComment({
          variables: {
            _id,
            index: props.commentIndex
          }
        });

        if (props.setDeletedIndex) props.setDeletedIndex(props.commentIndex);
      } catch (err) {
        alert(err.message);
      }
    }
    // common users can delete only their comment
    else {
      try {
        await deleteComment({
          variables: {
            _id,
            index: props.commentIndex,
            password
          }
        });

        if (props.setDeletedIndex) props.setDeletedIndex(props.commentIndex);
      } catch (err) {
        alert(err.message);
      }
    }

    try {
      deleteCommentLog({
        variables: {
          postId: props.postId,
          commentIndex: props.commentIndex + 1
        }
      });
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDeleteReply() {
    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isAuth;
    const _id = +router.query['post-id'];

    // Admin can delete all replies
    if (isAuth) {
      try {
        await deleteReply({
          variables: {
            _id,
            commentIndex: props.commentIndex,
            replyIndex: props.replyIndex
          }
        });

        if (props.replyIndex !== undefined && props.setDeletedReplyIndex) props.setDeletedReplyIndex(props.replyIndex);
      } catch (err) {
        alert(err);
      }
    }
    // common users can delete only their reply
    else {
      try {
        await deleteReply({
          variables: {
            _id,
            commentIndex: props.commentIndex,
            replyIndex: props.replyIndex,
            password
          }
        });

        if (props.replyIndex !== undefined && props.setDeletedReplyIndex) props.setDeletedReplyIndex(props.replyIndex);
      } catch (err) {
        alert(err);
      }
    }

    try {
      deleteCommentLog({
        variables: {
          postId: props.postId,
          commentIndex: props.commentIndex + 1,
          replyIndex: props?.replyIndex! + 1
        }
      });
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleCommentEdit() {
    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isAuth;
    const _id = +router.query['post-id'];

    if (!commentContent) {
      setCommentContent(props.comment.comment);
      alert('내용을 입력해 주세요.');
      return;
    }

    if (isAuth) {
      try {
        await editComment({
          variables: {
            _id,
            index: props.commentIndex,
            newComment: commentContent
          }
        });
      } catch (err) {
        setCommentContent(props.comment.comment);
        alert(err.message);
      }
    } else {
      try {
        await editComment({
          variables: {
            _id,
            index: props.commentIndex,
            newComment: commentContent,
            password
          }
        });
      } catch (err) {
        setCommentContent(props.comment.comment);
        alert(err.message);
      }
    }
  }

  async function handleReplyEdit() {
    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isAuth;
    const _id = +router.query['post-id'];

    if (!commentContent) {
      setCommentContent(props.comment.comment);
      alert('내용을 입력해 주세요.');
      return;
    }

    if (isAuth) {
      try {
        await editReply({
          variables: {
            _id,
            commentIndex: props.commentIndex,
            replyIndex: props.replyIndex,
            newReply: commentContent
          }
        });
      } catch (err) {
        setCommentContent(props.comment.comment);
        alert(err.message);
      }
    } else {
      try {
        await editReply({
          variables: {
            _id,
            commentIndex: props.commentIndex,
            replyIndex: props.replyIndex,
            newReply: commentContent,
            password
          }
        });
      } catch (err) {
        setCommentContent(props.comment.comment);
        alert(err.message);
      }
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
            <p>{FormatUnifier.getFullFormatDate(createdAt)}</p>
          </Time>
        </InformationContainer>
        {(props.isLogin || !props.isCommentFromAdmin) && (
          <DropDownMenu
            visible={isMenuOpen}
            mainButton={<FontAwesomeIcon icon={faEllipsisV} />}
            setVisible={setIsMenuOpen}
            dropMenu={
              <>
                {/* admin인경우: 자기것만 edit, 나머지는 edit 버튼 X, admin 아닌경우 edit 버튼 O */}
                {props.isLogin ? (
                  props.comment.isAdmin && (
                    <MenuButton
                      onClick={() => {
                        setIsAdminCommentEdit(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      {trans(Lang.Edit)}
                    </MenuButton>
                  )
                ) : (
                  <MenuButton
                    onClick={() => {
                      setIsUserCommentEdit(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    {trans(Lang.Edit)}
                  </MenuButton>
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
              </>
            }
          />
        )}
      </DetailsContainer>
      {isAdminCommentEdit || isUserCommentEdit ? (
        <EditContainer>
          <CommentEditor
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={(e: React.ChangeEvent<HTMLSpanElement>) => {
              setCommentContent(e.target.innerText);
            }}
          >
            {props.comment.comment}
          </CommentEditor>
          <EditMenuContainer>
            {props.isCommentFromAdmin || (
              <input placeholder='password' type='password' minLength={8} maxLength={20} onChange={(e) => setPassword(e.target.value)} />
            )}
            <EditButtonItem
              onClick={() => {
                isAdminCommentEdit ? setIsAdminCommentEdit(false) : setIsUserCommentEdit(false);
                setCommentContent(props.comment.comment);
              }}
            >
              Cancel
            </EditButtonItem>
            <EditButtonItem
              onClick={() => {
                if (props.isReply) {
                  handleReplyEdit();
                } else {
                  handleCommentEdit();
                }
                setIsAdminCommentEdit(false);
                setIsUserCommentEdit(false);
              }}
            >
              Edit
            </EditButtonItem>
          </EditMenuContainer>
        </EditContainer>
      ) : (
        <CommentContent>{commentContent}</CommentContent>
      )}
      {props.children}
      <ModalWrapper visible={isModalOpen}>
        <ModalContainer>
          <ModalParagraph>{props.isLogin ? '정말 삭제하시겠습니까?' : '비밀번호를 입력해주세요'}</ModalParagraph>
          {props.isLogin || (
            <Password>
              <NoRefInputBox
                id='comment-pw-auth'
                type='password'
                placeholder='Password'
                maxLength={20}
                minLength={8}
                styles={{ width: '100%' }}
                value={password}
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
              danger
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
