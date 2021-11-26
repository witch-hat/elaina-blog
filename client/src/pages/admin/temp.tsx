import React, { useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { trans, Lang } from 'src/resources/languages';
import { initializeApollo } from 'src/lib/apollo';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { AdminPageLayout, PageTitle } from 'src/components/pages/admin';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';
import { DeletePostAllCommentLogQueryType, DeletePostAllCommentLogVars, DELETE_POST_ALL_COMMENT_LOG } from 'src/query/comment-log';
import {
  GetTempPostQueryType,
  GET_TEMP_POSTS,
  TempPostType,
  GetTempPostVars,
  DELETE_TEMP_POST,
  DeleteTempPostQueryType,
  DeleteTempPostVars
} from 'src/query/temp';
import { PostsBox } from 'src/components/pages/admin/post/PostsBox';

const Container = styled.div({
  width: '100%'
});

const BoardTable = styled.table({
  width: '100%',
  height: '100%'
});

const BoardTH = styled.th({
  padding: '10px',
  color: 'white',
  border: '1px solid #ddd',
  backgroundColor: '#867dff',
  textAlign: 'center'
});

const BoardTR = styled.tr({
  '&:hover': {
    backgroundColor: '#d1cffaa7'
  }
});

const PagenationNext = styled.button((props) => ({
  float: 'right',
  padding: '3px 10px',
  outline: 'none',
  color: 'white',
  backgroundColor: '#867dff',
  border: `1px solid ${props.theme.borderColor}`,
  borderRadius: '8px',
  fontSize: '11px',

  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#d1cffaa7',
    color: 'black'
  }
}));

interface ServerSideProps {
  posts: TempPostType[];
}

interface ModalProps {
  visible: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

const DynamicDeleteModal = dynamic<ModalProps>(() =>
  import('src/components/pages/post/article/DeleteModal').then((mod) => mod.DeleteModal)
);

interface Props extends AppCommonProps, ServerSideProps {}

export default function PostProps(props: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePostID, setDeletePostID] = useState(0);

  const [deletePost] = useMutation<DeleteTempPostQueryType, DeleteTempPostVars>(DELETE_TEMP_POST);
  const [deletePostAllCommentLog] = useMutation<DeletePostAllCommentLogQueryType, DeletePostAllCommentLogVars>(DELETE_POST_ALL_COMMENT_LOG);

  const router = useRouter();
  const client = useApolloClient();

  async function deleteButtonClick(deletePostId: number) {
    setIsModalOpen(true);
    setDeletePostID(deletePostId);
  }

  async function handleDeleteButtonClick() {
    const { data } = await client.query<IsAuthQueryType>({ query: IS_AUTH });
    const isAdmin = data.isAuth.isSuccess;

    if (isAdmin) {
      try {
        const [deleteResponse] = await Promise.all([
          deletePost({
            variables: {
              id: +deletePostID
            }
          }),
          deletePostAllCommentLog({
            variables: {
              postId: +deletePostID
            }
          })
        ]);

        if (!deleteResponse.data) {
          alert('Can not delete post');
          return;
        }

        if (!deleteResponse.data.deleteTempPost.isSuccess) {
          alert('Can not delete post');
          return;
        }

        //router.push('/admin/posts'); // 더 좋은 방법이 없을까..?
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
    <AdminPageLayout>
      <Container>
        <PageTitle title={trans(Lang.TempPosts)} />
        <DynamicDeleteModal visible={isModalOpen} onDelete={handleDeleteButtonClick} onCancel={handleCancelButtonClick} />

        <>
          <BoardTable>
            <thead>
              <BoardTR>
                <BoardTH>id</BoardTH>
                <BoardTH>카테고리</BoardTH>
                <BoardTH>글 제목</BoardTH>
                <BoardTH>작성일</BoardTH>
                <BoardTH>삭제</BoardTH>
              </BoardTR>
            </thead>
            <tbody>
              {props.posts.map((post) => {
                return (
                  <PostsBox
                    key={post._id}
                    _id={post._id}
                    category={post.cateogry}
                    title={post.title}
                    savedAt={post.savedAt}
                    article={post.article}
                    onDeleteClick={deleteButtonClick}
                  ></PostsBox>
                );
              })}
            </tbody>
          </BoardTable>
        </>
        <PagenationNext>Next</PagenationNext>
      </Container>
    </AdminPageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login?url=%2Fadmin%2Ftemp'
      }
    };
  }

  const client = initializeApollo({}, context);
  const { data } = await client.query<GetTempPostQueryType, GetTempPostVars>({
    query: GET_TEMP_POSTS,
    variables: {
      page: 1
    }
  });
  const posts = data.tempPosts;

  return {
    props: {
      posts
    }
  };
};
