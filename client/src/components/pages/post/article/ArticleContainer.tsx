import React, { useState } from 'react';
import styled from 'styled-components';
import { useMutation, useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import {
  DeletePostQueryType,
  DeletePostVars,
  DELETE_POST,
  FindSameCategoryPostsQueryType,
  FindSameCategoryPostsVars,
  FIND_SAME_CATEGORY_POSTS
} from 'src/query/post';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';
import { ProfileDataType } from 'src/query/profile';

import { ArticleMenu } from './ArticleMenu';
import { DeletePostAllCommentLogQueryType, DeletePostAllCommentLogVars, DELETE_POST_ALL_COMMENT_LOG } from 'src/query/comment-log';
import { MemoizedArticle } from './Article';

interface ModalProps {
  visible: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const DynamicDeleteModal = dynamic<ModalProps>(() => import('./DeleteModal').then((mod) => mod.DeleteModal));

const Container = styled.main({
  display: 'flex',
  width: '100%',
  minHeight: 'calc(100vh - 5rem - 40px)',
  padding: '.5rem 1.5rem',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '@media screen and (max-width: 767px)': {
    padding: '.5rem'
  }
});

const Title = styled.title({
  display: 'block',
  width: '100%',
  fontSize: '2.5rem',
  fontWeight: 'bold',
  '@media screen and (max-width: 767px)': {
    fontSize: '2rem'
  }
});

interface Props {
  title: string;
  profile: ProfileDataType;
  createdAt: number;
  article: string;
  isLogin: boolean;
}

export function ArticleContainer(props: Props) {
  const time = new Date(props.createdAt);

  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const client = useApolloClient();
  const [deletePost] = useMutation<DeletePostQueryType, DeletePostVars>(DELETE_POST);
  const [deletePostAllCommentLog] = useMutation<DeletePostAllCommentLogQueryType, DeletePostAllCommentLogVars>(DELETE_POST_ALL_COMMENT_LOG);

  const id = router.query['pid']!;

  async function handleDeleteButtonClick() {
    const authResponse = await client.query<IsAuthQueryType>({ query: IS_AUTH });

    const isAdmin = authResponse.data.isAuth.isSuccess;

    if (isAdmin) {
      try {
        const [deleteResponse] = await Promise.all([
          deletePost({
            variables: {
              id: +id
            }
          }),
          deletePostAllCommentLog({
            variables: {
              postId: +id
            }
          })
        ]);

        if (!deleteResponse.data) {
          alert('Cannot delete post...');
          return;
        }

        if (!deleteResponse.data.deletePost.isSuccess) {
          alert('Cannot delete post...');
          return;
        }

        const categoryId = deleteResponse.data.deletePost.categoryId!;
        const { data } = await client.query<FindSameCategoryPostsQueryType, FindSameCategoryPostsVars>({
          query: FIND_SAME_CATEGORY_POSTS,
          variables: { categoryId }
        });

        if (data.findSameCategoryPosts.post.length === 0) {
          router.push('/');
        } else {
          const lastPostId = data.findSameCategoryPosts.post[0]._id;
          router.push(`/post/${lastPostId}`);
        }
      } catch (err) {
        alert(err.message);
      }
    } else {
      return alert('Invalid User');
    }

    setIsModalOpen(false);
  }

  function handleCancelButtonClick() {
    setIsModalOpen(false);
  }

  return (
    <Container>
      <Title>{props.title}</Title>
      <ArticleMenu isLogin={props.isLogin} time={time} profile={props.profile} id={id as string} setIsModalOpen={setIsModalOpen} />
      <MemoizedArticle article={props.article} />
      <DynamicDeleteModal visible={isModalOpen} onDelete={handleDeleteButtonClick} onCancel={handleCancelButtonClick} />
    </Container>
  );
}
