import React, { useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { GET_LATEST_POSTS, GetLastestPostsQueryType, GetLatestPostsVars, PostDetailDataType } from 'src/query/post';
import { trans, Lang } from 'src/resources/languages';
import { initializeApollo } from 'src/lib/apollo';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { AdminPageLayout, PageTitle } from 'src/components/pages/admin';
import { FormatUnifier } from 'src/utils';
import { DeletePostQueryType, DeletePostVars, DELETE_POST } from 'src/query/post';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';
import { DeletePostAllCommentLogQueryType, DeletePostAllCommentLogVars, DELETE_POST_ALL_COMMENT_LOG } from 'src/query/comment-log';

const Container = styled.div({
  width: '100%'
});

const BoardTD = styled.td({
  border: '1px solid #ddd',
  padding: '12px'
});

const BoardTH = styled.th({
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#867dff',
  color: 'white'
});

const BoardTR = styled.tr({
  '&:hover': {
    backgroundColor: '#d1cffaa7'
  }
});

const DeleteButton = styled.button({
  outline: 'none',
  fontSize: '11px',
  color: '#e9493d',
  padding: '3px 10px',
  borderRadius: '8px',
  cursor: 'pointer',
  border: '1px solid #e9493d',
  backgroundColor: 'transparent',
  '&:active': {
    border: '1px solid blue'
  }
});

interface ServerSideProps {
  posts: PostDetailDataType[];
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
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletePostID, setDeletePostID] = useState(0);

  async function deleteButtonClick(deletePostId: React.SetStateAction<number>) {
    setIsModalOpen(true);
    setDeletePostID(deletePostId);
  }

  const client = useApolloClient();
  const [deletePost] = useMutation<DeletePostQueryType, DeletePostVars>(DELETE_POST);
  const [deletePostAllCommentLog] = useMutation<DeletePostAllCommentLogQueryType, DeletePostAllCommentLogVars>(DELETE_POST_ALL_COMMENT_LOG);

  const id = deletePostID;

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
          alert('Can not delete post');
          return;
        }

        if (!deleteResponse.data.deletePost.isSuccess) {
          alert('Can not delete post');
          return;
        }

        router.push('/admin/posts'); // 더 좋은 방법이 없을까..?
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
        <PageTitle title={trans(Lang.BoardManage)} />
        <DynamicDeleteModal visible={isModalOpen} onDelete={handleDeleteButtonClick} onCancel={handleCancelButtonClick} />

        <>
          <table>
            <thead>
              <BoardTR>
                <BoardTH>post_id</BoardTH>
                <BoardTH>카테고리</BoardTH>
                <BoardTH>글 제목</BoardTH>
                <BoardTH>등록일</BoardTH>
                <BoardTH>삭제</BoardTH>
              </BoardTR>
            </thead>
            <tbody>
              {props.posts.map((post) => {
                return (
                  <BoardTR key={post.title + post._id}>
                    <BoardTD>{post._id}</BoardTD>
                    <BoardTD>{post.categoryId}</BoardTD>
                    <BoardTD>{post.title}</BoardTD>
                    <BoardTD>{FormatUnifier.getFullFormatDate(new Date(post.createdAt))}</BoardTD>
                    <BoardTD>
                      <DeleteButton onClick={() => deleteButtonClick(post._id)}>Delete</DeleteButton>
                    </BoardTD>
                  </BoardTR>
                );
              })}
            </tbody>
          </table>
        </>
      </Container>
    </AdminPageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login?url=%2Fadmin%2Fposts'
      }
    };
  }

  const client = initializeApollo({}, context);
  const { data } = await client.query<GetLastestPostsQueryType, GetLatestPostsVars>({
    query: GET_LATEST_POSTS,
    variables: {
      page: 1
    }
  });
  const posts = data.getLatestPosts;

  return {
    props: {
      posts
    }
  };
};
