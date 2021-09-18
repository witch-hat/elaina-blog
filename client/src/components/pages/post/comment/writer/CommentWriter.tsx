import styled from 'styled-components';
import { useMutation, useApolloClient } from '@apollo/client';

import { WRITE_COMMENT, WriteCommentVars, WriteCommentQueryType, CommentContainerType } from 'src/query/comment';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';
import { PUSH_COMMENT_LOG, CommentEvent, PushCommentLogVars, PushCommentLogQueryType } from 'src/query/comment-log';

import { Writer } from './Writer';

const Container = styled.div({
  width: 'calc(100% - 6rem)'
});

interface Props {
  isLogin: boolean;
  categoryId: number;
  postId: number;
  commentIndex: number;
  onAddComment: (response: CommentContainerType) => void;
}

export function CommentWriter(props: Props) {
  const client = useApolloClient();
  const [writeComment] = useMutation<WriteCommentQueryType, WriteCommentVars>(WRITE_COMMENT);
  const [pushCommentLog] = useMutation<PushCommentLogQueryType, PushCommentLogVars>(PUSH_COMMENT_LOG);

  async function addComment(username: string, password: string, comment: string) {
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
        // writeComment need to have response...
        const { data } = await writeComment({
          variables: {
            pid: props.postId,
            comment,
            createdAt,
            isAdmin
          }
        });

        if (!data) {
          alert('Server Error.. please retry');
          return;
        }

        props.onAddComment(data.writeComment);
      } catch (err: any) {
        alert(err.msg);
      }
    } else {
      if (username.length < 2 || password.length < 8) {
        alert('username: 2자 이상, password: 8자 이상 입력해주세요');
        return;
      }

      try {
        const [{ data }] = await Promise.all([
          writeComment({
            variables: {
              pid: props.postId,
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
              event: CommentEvent.NewComment,
              categoryId: props.categoryId,
              postId: props.postId,
              commentIndex: props.commentIndex
            }
          })
        ]);

        if (!data) {
          alert('Server Error.. please retry');
          return;
        }

        props.onAddComment(data.writeComment);
      } catch (err: any) {
        alert(err.message);
      }
    }
  }

  return (
    <Container>
      <Writer isLogin={props.isLogin} addComment={addComment} isComment />
    </Container>
  );
}
