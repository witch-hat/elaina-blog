import { useMutation, useApolloClient } from '@apollo/client';

import {
  CommentType,
  DELETE_COMMENT,
  EDIT_COMMENT,
  DeleteCommentVars,
  DeleteCommentQueryType,
  EditCommentQueryType,
  EditCommentVars
} from 'src/query/comment';
import { DELETE_COMMENT_LOG, DeleteCommentLogVars, DeleteCommentLogQueryType } from 'src/query/comment-log';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';

import { CommentBoxLayout } from './BoxLayout';

interface Props {
  isLogin: boolean;
  postId: number;
  isCommentFromAdmin: boolean;
  comment: CommentType;
  author: string;
  commentIndex: number;
  editComment: (index: number, comment: string) => void;
  deleteComment: (index: number) => void;
  children?: JSX.Element;
}

export function CommentBox(props: Props) {
  const client = useApolloClient();
  const [deleteComment] = useMutation<DeleteCommentQueryType, DeleteCommentVars>(DELETE_COMMENT);
  const [editComment] = useMutation<EditCommentQueryType, EditCommentVars>(EDIT_COMMENT);
  const [deleteCommentLog] = useMutation<DeleteCommentLogQueryType, DeleteCommentLogVars>(DELETE_COMMENT_LOG);

  async function handleEditComment(commentContent: string, password: string) {
    if (!commentContent) {
      alert('내용을 입력해 주세요.');
      return;
    }

    const AuthResponse = await client.query<IsAuthQueryType>({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isSuccess;

    if (isAuth) {
      const { data } = await editComment({
        variables: {
          pid: props.postId,
          commentId: props.comment._id,
          newComment: commentContent
        }
      });

      if (data?.editComment.isSuccess) {
        props.editComment(props.commentIndex, commentContent);
      }
    } else {
      const { data } = await editComment({
        variables: {
          pid: props.postId,
          commentId: props.comment._id,
          newComment: commentContent,
          password
        }
      });

      if (data?.editComment.isSuccess) {
        props.editComment(props.commentIndex, commentContent);
      }
    }
  }

  async function handleDeleteComment(password: string) {
    const AuthResponse = await client.query<IsAuthQueryType>({ query: IS_AUTH });
    const isAuth = AuthResponse.data.isAuth.isSuccess;

    // Admin can delete all comments
    if (isAuth) {
      try {
        const { data } = await deleteComment({
          variables: {
            pid: props.postId,
            commentId: props.comment._id
          }
        });

        if (data?.deleteComment.isSuccess) {
          props.deleteComment(props.commentIndex);
        }
      } catch (err: any) {
        alert(err.message);
        return;
      }
    }

    // common users can delete only their comment
    else {
      try {
        const { data } = await deleteComment({
          variables: {
            pid: props.postId,
            commentId: props.comment._id,
            password
          }
        });

        if (data?.deleteComment.isSuccess) {
          props.deleteComment(props.commentIndex);
        }
      } catch (err: any) {
        alert(err.message);
        return;
      }
    }

    try {
      await deleteCommentLog({
        variables: {
          postId: props.postId,
          commentIndex: props.commentIndex + 1
        }
      });
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <CommentBoxLayout
      isLogin={props.isLogin}
      comment={props.comment}
      author={props.author}
      onEdit={handleEditComment}
      onDelete={handleDeleteComment}
    >
      {props.children}
    </CommentBoxLayout>
  );
}
