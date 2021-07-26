import { useMutation } from '@apollo/client';

import { ReplyType, WRITE_REPLY, WriteReplyVars, WriteReplyQueryType } from 'src/query/comment';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';
import { PUSH_COMMENT_LOG, CommentEvent, PushCommentLogVars, PushCommentLogQueryType } from 'src/query/comment-log';

import { Writer } from './Writer';

interface Props {
  isLogin: boolean;
  categoryId: number;
  postId: number;
  commentIndex: number;
  replyIndex: number;
  onAddReply: (newReply: ReplyType) => void;
}

export function ReplyWriter(props: Props) {
  const client = useApollo();
  const [writeReply] = useMutation<WriteReplyQueryType, WriteReplyVars>(WRITE_REPLY);
  const [pushCommentLog] = useMutation<PushCommentLogQueryType, PushCommentLogVars>(PUSH_COMMENT_LOG);

  async function addReply(username: string, password: string, comment: string) {
    if (comment.length < 2) {
      alert('덧글을 2자 이상 작성해주세요');
      return;
    }

    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAdmin = AuthResponse.data.isAuth.isAuth;
    const createdAt = new Date();

    if (isAdmin) {
      try {
        // BUG?
        // writeReply need to have response...
        await writeReply({
          variables: {
            _id: props.postId,
            commentIndex: props.commentIndex,
            comment,
            createdAt,
            isAdmin
          }
        });

        props.onAddReply({
          username,
          password,
          comment,
          createdAt: createdAt.getTime(),
          isAdmin
        });
      } catch (err) {
        alert(err);
      }
    } else {
      if (username.length < 2 || password.length < 4) {
        alert('username: 2자 이상, password: 4자 이상 입력해주세요');
        return;
      }

      try {
        await Promise.all([
          writeReply({
            variables: {
              _id: props.postId,
              commentIndex: props.commentIndex,
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
              event: CommentEvent.newReply,
              categoryId: props.categoryId,
              postId: props.postId,
              commentIndex: props.commentIndex + 1,
              replyIndex: props.replyIndex
            }
          })
        ]);

        props.onAddReply({
          username,
          password,
          comment,
          createdAt: createdAt.getTime(),
          isAdmin
        });
      } catch (err) {
        alert(err);
      }
    }
  }

  return <Writer isLogin={props.isLogin} addComment={addReply} />;
}
