import { useMutation } from '@apollo/client';

import {
  CommentType,
  DELETE_REPLY,
  EDIT_REPLY,
  ReplyType,
  DeleteReplyQueryType,
  DeleteReplyVars,
  EditReplyQueryType,
  EditReplyVars
} from 'src/query/comment';
import { DELETE_COMMENT_LOG, DeleteCommentLogQueryType, DeleteCommentLogVars } from 'src/query/comment-log';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';

import { CommentBoxLayout } from './BoxLayout';

interface Props {
  isLogin: boolean;
  postId: number;
  isCommentFromAdmin: boolean;
  comment: CommentType | ReplyType;
  author: string;
  commentIndex: number;
  replyIndex: number;
  editReply: (index: number, reply: string) => void;
  deleteReply: (index: number) => void;
}

export function ReplyBox(props: Props) {
  const client = useApollo();
  const [deleteReply] = useMutation<DeleteReplyQueryType, DeleteReplyVars>(DELETE_REPLY);
  const [editReply] = useMutation<EditReplyQueryType, EditReplyVars>(EDIT_REPLY);
  const [deleteCommentLog] = useMutation<DeleteCommentLogQueryType, DeleteCommentLogVars>(DELETE_COMMENT_LOG);

  async function handleEditReply(commentContent: string, password: string) {
    if (!commentContent) {
      throw new Error('내용을 입력해 주세요.');
    }

    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isAuth;

    if (isAuth) {
      try {
        await editReply({
          variables: {
            _id: props.postId,
            commentIndex: props.commentIndex,
            replyIndex: props.replyIndex,
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
            _id: props.postId,
            commentIndex: props.commentIndex,
            replyIndex: props.replyIndex,
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
    const AuthResponse = await client.query({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isAuth;

    // Admin can delete all replies
    if (isAuth) {
      try {
        await deleteReply({
          variables: {
            _id: props.postId,
            commentIndex: props.commentIndex,
            replyIndex: props.replyIndex
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
            _id: props.postId,
            commentIndex: props.commentIndex,
            replyIndex: props.replyIndex,
            password
          }
        });
      } catch (err) {
        alert(err.message);
        return;
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

    props.deleteReply(props.replyIndex);
  }

  return (
    <CommentBoxLayout
      isLogin={props.isLogin}
      comment={props.comment}
      author={props.author}
      onEdit={handleEditReply}
      onDelete={handleDeleteReply}
    />
  );
}
