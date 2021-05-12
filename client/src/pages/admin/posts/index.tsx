import React, { useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BorderBox } from 'src/components';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { initApolloClient } from 'src/apollo/withApollo';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { Post, GET_POSTS } from 'src/query/post';
import { AdminPageLayout } from '../component/AdminPageLayout';
import Link from 'next/link';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const PostListContainer = styled.div({
  width: '100%',
  padding: '.5rem'
});

const PostContainer = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
});

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1
});

const MenuContainer = styled.div({
  flex: 1,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  padding: '.8rem'
});

const Content = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '.8rem',
  height: '5rem'
});

const PreviewTextWrapper = styled.div({
  width: '100%',
  display: 'flex',
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

interface ServerSideProps {
  posts: Post[];
}

interface Props extends AppCommonProps, ServerSideProps {}

export default function PostProps(props: Props) {
  const [posts] = useState<Post[]>(props.posts.reverse());

  return (
    <AdminPageLayout>
      <PostListContainer>
        <Container>
          {posts.map((post) => {
            return (
              <Link href={`/post/${post._id}`} passHref key={`${post.title}${post._id}`}>
                <PostContainer>
                  <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
                    <Wrapper>
                      <MenuContainer>
                        <CircleRippleWrapper
                          onClick={() => {
                            // setDeletedPost({ isModalOpen: true, index });
                            alert('준비중');
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.25rem' }} />
                        </CircleRippleWrapper>
                      </MenuContainer>

                      <Content>
                        <PreviewTextWrapper>
                          <PreviewTitle>{post.title}</PreviewTitle>
                        </PreviewTextWrapper>
                      </Content>
                    </Wrapper>
                  </BorderBox>
                </PostContainer>
              </Link>
            );
          })}
        </Container>
      </PostListContainer>
    </AdminPageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login'
      }
    };
  }

  const client = initApolloClient({}, context);
  const { data } = await client.query({ query: GET_POSTS });
  const posts = data.posts;

  return {
    props: {
      posts
    }
  };
};
