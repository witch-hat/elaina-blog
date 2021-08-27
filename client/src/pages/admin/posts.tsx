import React, { useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useMutation, useApolloClient } from '@apollo/client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { GET_LATEST_POSTS, GetLastestPostsQueryType, GetLatestPostsVars, PostDetailDataType } from 'src/query/post';
import { trans, Lang } from 'src/resources/languages';
import { initializeApollo } from 'src/lib/apollo';
import { BorderBox, CircleRippleWrapper } from 'src/components';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { AdminPageLayout, PageTitle } from 'src/components/pages/admin';
import { FormatUnifier } from 'src/utils';

import { DeletePostQueryType, DeletePostVars, DELETE_POST } from 'src/query/post';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';
import { DeletePostAllCommentLogQueryType, DeletePostAllCommentLogVars, DELETE_POST_ALL_COMMENT_LOG } from 'src/query/comment-log';

const Container = styled.div({
  width: '100%'
});

const PostContainer = styled.div({
  width: '100%'
});

const Wrapper = styled.div({
  position: 'relative',
  flex: 1
});

const DeleteButtonWrapper = styled.div({
  position: 'absolute',
  top: '.2rem',
  right: '1rem',
  zIndex: 1,

  '&:hover': {
    transform: 'translateY(-1px)',
    boxShadow: '1px 8px 5px -3px gray'
  }
});

const Content = styled.div({
  padding: '.8rem',
  width: '100%',
  height: '7rem'
});

const PreviewTextWrapper = styled.div({
  width: '100%',
  height: '100%'
});

const PreviewTitle = styled.span({
  flexShrink: 0,
  height: '2rem',
  width: '100%',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  textAlign: 'left',
  wordBreak: 'break-all',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '@media screen and (max-width: 1380px)': {
    wordBreak: 'break-all'
  }
});

const PreviewContent = styled.span({
  flexShrink: 0,
  width: '100%',
  margin: '.8rem 0 0',
  wordBreak: 'keep-all',
  textAlign: 'left',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
});

const BoardTD = styled.td({
  border: '1px solid #ddd',
  padding: '12px'
});

const BoardTH = styled.th({
  border: '1px solid #ddd',
  padding: '10px',
  textAlign: 'center',
  backgroundColor: '#80a8b3',
  color: 'white'
});

const BoardTR = styled.tr({
  '&:hover': {
    backgroundColor: '#7fd4d865'
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
                  // <Link key={post.title + post._id} href={`/post/${post._id}`} passHref>
                  //   <PostContainer>
                  //     <BorderBox isHoverEffect={true} styles={{ width: '100%', margin: '.8rem 0' }}>
                  //       <Wrapper>
                  //         <DeleteButtonWrapper>
                  //           <CircleRippleWrapper
                  //             onClick={(event) => {
                  //               event.stopPropagation();
                  //               // setDeletedPost({ isModalOpen: true, index });
                  //               alert('준비중');
                  //             }}
                  //           >
                  //             <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.25rem' }} />
                  //           </CircleRippleWrapper>
                  //         </DeleteButtonWrapper>
                  //         <Content>
                  //           <PreviewTextWrapper>
                  //             <PreviewTitle>{post.title}</PreviewTitle>
                  //             <PreviewContent>{post.article}</PreviewContent>
                  //           </PreviewTextWrapper>
                  //         </Content>
                  //       </Wrapper>
                  //     </BorderBox>
                  //   </PostContainer>
                  // </Link>

                  <BoardTR key={post.title + post._id}>
                    <DynamicDeleteModal visible={isModalOpen} onDelete={handleDeleteButtonClick} onCancel={handleCancelButtonClick} />

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
