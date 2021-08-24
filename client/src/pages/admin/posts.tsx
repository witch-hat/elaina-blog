import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { GET_LATEST_POSTS, GetLastestPostsQueryType, GetLatestPostsVars, PostDetailDataType } from 'src/query/post';
import { trans, Lang } from 'src/resources/languages';
import { initializeApollo } from 'src/lib/apollo';
import { BorderBox, CircleRippleWrapper } from 'src/components';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { AdminPageLayout, PageTitle } from 'src/components/pages/admin';

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

const deletePost = (post_id: any) => {
  // return <div>delete this post._id: {post_id}</div>;
  return alert(post_id);
};

interface Props extends AppCommonProps, ServerSideProps {}

export default function PostProps(props: Props) {
  // const [posts, setPosts] = useState<PostType[]>(props.posts);

  return (
    <AdminPageLayout>
      <Container>
        <PageTitle title={trans(Lang.BoardManage)} />

        <>
          <table>
            <thead>
              <BoardTR>
                <BoardTH>선택</BoardTH>
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
                    <BoardTD></BoardTD>
                    <BoardTD>{post._id}</BoardTD>
                    <BoardTD>{post.categoryId}</BoardTD>
                    <BoardTD>{post.title}</BoardTD>
                    <BoardTD>{post.createdAt}</BoardTD>
                    <BoardTD>
                      <DeleteButton onClick={() => deletePost(post._id)}>Delete</DeleteButton>
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
