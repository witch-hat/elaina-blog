import { useMutation } from '@apollo/client';

import { WRITE_COMMENT, CommentType, WriteCommentVars, WriteCommentQueryType } from 'src/query/comment';
import { useApollo } from 'src/lib/apolloClient';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';
import { PUSH_COMMENT_LOG, CommentEvent, PushCommentLogVars, PushCommentLogQueryType } from 'src/query/comment-log';

import { Writer } from './Writer';

interface Props {
  isLogin: boolean;
  categoryId: number;
  postId: number;
  commentIndex: number;
  onAddComment: (newComment: CommentType) => void;
}

export function CommentWriter(props: Props) {
  const client = useApollo();
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
        await writeComment({
          variables: {
            _id: props.postId,
            comment,
            createdAt,
            isAdmin
          }
        });

        console.log('here');

        props.onAddComment({
          comment,
          createdAt: createdAt.getTime(),
          isAdmin,
          replies: []
        });
      } catch (err) {
        alert(err.msg);
      }
    } else {
      if (username.length < 2 || password.length < 8) {
        alert('username: 2자 이상, password: 8자 이상 입력해주세요');
        return;
      }

      try {
        await Promise.all([
          writeComment({
            variables: {
              _id: props.postId,
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
              event: CommentEvent.newComment,
              categoryId: props.categoryId,
              postId: props.postId,
              commentIndex: props.commentIndex
            }
          })
        ]);

        props.onAddComment({
          username,
          password,
          comment,
          createdAt: createdAt.getTime(),
          isAdmin,
          replies: []
        });
      } catch (err) {
        alert(err.message);
      }
    }
  }

  return <Writer isLogin={props.isLogin} addComment={addComment} isComment />;
}
