import { useMutation, useApolloClient } from '@apollo/client';

import {
  DELETE_REPLY,
  EDIT_REPLY,
  DeleteReplyQueryType,
  DeleteReplyVars,
  EditReplyQueryType,
  EditReplyVars,
  ReplyType
} from 'src/query/comment';
import { DELETE_COMMENT_LOG, DeleteCommentLogQueryType, DeleteCommentLogVars } from 'src/query/comment-log';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';

import { CommentBoxLayout } from './BoxLayout';

interface Props {
  isLogin: boolean;
  postId: number;
  isCommentFromAdmin: boolean;
  reply: ReplyType;
  author: string;
  commentIndex: number;
  commentId: string;
  replyIndex: number;
  editReply: (index: number, reply: string) => void;
  deleteReply: (index: number) => void;
}

export function ReplyBox(props: Props) {
  const client = useApolloClient();
  const [deleteReply] = useMutation<DeleteReplyQueryType, DeleteReplyVars>(DELETE_REPLY);
  const [editReply] = useMutation<EditReplyQueryType, EditReplyVars>(EDIT_REPLY);
  const [deleteCommentLog] = useMutation<DeleteCommentLogQueryType, DeleteCommentLogVars>(DELETE_COMMENT_LOG);

  async function handleEditReply(commentContent: string, password: string) {
    if (!commentContent) {
      alert('내용을 입력해 주세요.');
      return;
    }

    const AuthResponse = await client.query<IsAuthQueryType>({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isSuccess;

    if (isAuth) {
      try {
        await editReply({
          variables: {
            pid: props.postId,
            commentId: props.commentId,
            replyId: props.reply._id,
            newReply: commentContent
          }
        });
      } catch (err) {
        // NEED TO FIX: using throw for handling doesn't seems nice...
        throw err;
      }
    } else {
      try {
        await editReply({
          variables: {
            pid: props.postId,
            commentId: props.commentId,
            replyId: props.reply._id,
            newReply: commentContent,
            password
          }
        });
      } catch (err) {
        throw err;
      }
    }

    props.editReply(props.replyIndex, commentContent);
  }

  async function handleDeleteReply(password: string) {
    const AuthResponse = await client.query<IsAuthQueryType>({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isSuccess;

    // Admin can delete all replies
    if (isAuth) {
      try {
        await deleteReply({
          variables: {
            pid: props.postId,
            commentId: props.commentId,
            replyId: props.reply._id
          }
        });
      } catch (err) {
        alert(err.message);
        return;
      }
    }
    // common users can delete only their reply
    else {
      try {
        await deleteReply({
          variables: {
            pid: props.postId,
            commentId: props.commentId,
            replyId: props.reply._id,
            password
          }
        });
      } catch (err) {
        alert(err.message);
        return;
      }
    }

    try {
      await deleteCommentLog({
        variables: {
          postId: props.postId,
          commentIndex: props.commentIndex + 1,
          replyIndex: props?.replyIndex! + 1
        }
      });
    } catch (err) {
      alert(err.message);
    }

    props.deleteReply(props.replyIndex);
  }

  return (
    <CommentBoxLayout
      isLogin={props.isLogin}
      comment={props.reply}
      author={props.author}
      onEdit={handleEditReply}
      onDelete={handleDeleteReply}
    />
  );
}
