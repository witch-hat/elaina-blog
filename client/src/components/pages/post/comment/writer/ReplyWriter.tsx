import styled from 'styled-components';
import { useMutation, useApolloClient } from '@apollo/client';

import { WRITE_REPLY, WriteReplyVars, WriteReplyQueryType, CommentType } from 'src/query/comment';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';
import { PUSH_COMMENT_LOG, CommentEvent, PushCommentLogVars, PushCommentLogQueryType } from 'src/query/comment-log';

import { Writer } from './Writer';

const Container = styled.div({
  width: '90%',
  margin: '0 auto'
});

interface Props {
  isLogin: boolean;
  categoryId: number;
  postId: number;
  commentIndex: number;
  commentId: string;
  replyIndex: number;
  onAddReply: (newReply: CommentType) => void;
}

export function ReplyWriter(props: Props) {
  const client = useApolloClient();
  const [writeReply] = useMutation<WriteReplyQueryType, WriteReplyVars>(WRITE_REPLY);
  const [pushCommentLog] = useMutation<PushCommentLogQueryType, PushCommentLogVars>(PUSH_COMMENT_LOG);

  async function addReply(username: string, password: string, comment: string) {
    if (comment.length < 2) {
      alert('덧글을 2자 이상 작성해주세요');
      return;
    }

    const AuthResponse = await client.query<IsAuthQueryType>({ query: IS_AUTH });
    const isAdmin = AuthResponse.data.isAuth.isSuccess;
    const createdAt = new Date();

    if (isAdmin) {
      try {
        // BUG?
        // writeReply need to have response...
        const { data } = await writeReply({
          variables: {
            pid: props.postId,
            commentId: props.commentId,
            comment,
            createdAt,
            isAdmin
          }
        });

        if (!data) {
          alert('Cannot write reply...');
          return;
        }

        props.onAddReply(data.writeReply);
      } catch (err) {
        alert(err);
      }
    } else {
      if (username.length < 2 || password.length < 4) {
        alert('username: 2자 이상, password: 4자 이상 입력해주세요');
        return;
      }

      try {
        const [{ data }] = await Promise.all([
          writeReply({
            variables: {
              pid: props.postId,
              commentId: props.commentId,
              username,
              password,
              comment,
              createdAt,
              isAdmin
            }
          }),
          pushCommentLog({
            variables: {
              time: new Date(createdAt),
              event: CommentEvent.NewReply,
              categoryId: props.categoryId,
              postId: props.postId,
              commentIndex: props.commentIndex + 1,
              replyIndex: props.replyIndex
            }
          })
        ]);

        if (!data) {
          alert('Cannot write reply...');
          return;
        }

        props.onAddReply(data.writeReply);
      } catch (err) {
        alert(err);
      }
    }
  }

  return (
    <Container>
      <Writer isLogin={props.isLogin} addComment={addReply} />
    </Container>
  );
}
