import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { BorderBox, CommentBox } from 'src/components';
import { CommentWriter } from 'src/pages/admin/writer/component/CommentWriter';
import { Reply, Comment, Comments } from 'src/query/comment';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { trans, Lang } from 'src/resources/languages';

import { ReplyElement } from './ReplyElement';

const Container = styled.div<{ themeMode: ThemeMode; isAdmin: boolean }>((props) => ({
  borderRadius: '12px',
  backgroundColor: props.isAdmin ? theme[props.themeMode].adminCommentColor : 'inherit'
}));

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
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

interface Props {
  comment: Comment;
  isLogin: boolean;
  author: string;
  isCommentFromAdmin: boolean;
  index: number;
  count: number;
  commentContainer: Comments;
  setCommentContainer: React.Dispatch<React.SetStateAction<Comments | null>>;
  setDeletedIndex: React.Dispatch<React.SetStateAction<number>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

export function CommentElement(props: Props) {
  const [isShowingReply, setIsShowingReply] = useState(false);
  const [isAddReply, setIsAddReply] = useState(false);
  const [replies, setReplies] = useState<Reply[]>(props.comment.replies);
  const [newReply, setNewReply] = useState<Reply>();
  const [deletedReplyIndex, setDeletedReplyIndex] = useState(-1);
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  useEffect(() => {
    setReplies(props.comment.replies);
  }, [props.commentContainer]);

  useEffect(() => {
    if (newReply) {
      setReplies([...replies, newReply]);
      props.setCount(props.count + 1);

      props.commentContainer.comments[props.index].replies.push(newReply);
      const newComments = props.commentContainer.comments;

      props.setCommentContainer({ ...props.commentContainer, comments: newComments });
      setIsAddReply(false);
      setIsShowingReply(true);
    }
  }, [newReply]);

  useEffect(() => {
    if (deletedReplyIndex > -1) {
      setReplies([...replies.filter((reply, index) => index !== deletedReplyIndex)]);
      props.setCount(props.count - 1);

      props.commentContainer.comments[props.index].replies.splice(deletedReplyIndex, 1);
      const newComments = props.commentContainer.comments;

      props.setCommentContainer({ ...props.commentContainer, comments: newComments });
    }
  }, [deletedReplyIndex]);

  return (
    <Container themeMode={themeMode} isAdmin={props.isCommentFromAdmin}>
      <BorderBox isTransform={false} styles={{ margin: '1rem 0 0', width: '100%' }}>
        <CommentBox
          isLogin={props.isLogin}
          isCommentFromAdmin={props.isCommentFromAdmin}
          comment={props.comment}
          author={props.author}
          commentIndex={props.index}
          setDeletedIndex={props.setDeletedIndex}
        >
          <>
            <ReplyButtonContainer>
              <ReplyButton onClick={() => replies.length && setIsShowingReply(!isShowingReply)}>{`${
                isShowingReply ? 'Hide' : `Show ${replies.length}`
              } Reply `}</ReplyButton>
              <ReplyButton onClick={() => setIsAddReply(!isAddReply)}>
                {isAddReply ? trans(Lang.Cancel) : trans(Lang.WriteReply)}
              </ReplyButton>
            </ReplyButtonContainer>
            {isAddReply && (
              <CommentWriter
                isLogin={props.isLogin}
                buttonText={trans(Lang.Save)}
                setNewReply={setNewReply}
                isReply
                commentIndex={props.index}
              />
            )}
            <ReplyContainer>
              {isShowingReply
                ? replies.map((reply: Reply, index: number) => {
                    return (
                      <ReplyElement
                        key={index}
                        isLogin={props.isLogin}
                        author={props.author}
                        commentIndex={props.index}
                        reply={reply}
                        replyIndex={index}
                        setDeletedReplyIndex={setDeletedReplyIndex}
                      />
                    );
                  })
                : null}
            </ReplyContainer>
          </>
        </CommentBox>
      </BorderBox>
    </Container>
  );
}
