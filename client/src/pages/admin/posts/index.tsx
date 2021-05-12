import React, { useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { GetServerSideProps, InferGetServerSidePropsType, NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BorderBox } from 'src/components';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { initApolloClient } from 'src/apollo/withApollo';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { Post, GET_POSTS } from 'src/query/post';
import { AdminPageLayout } from '../component/AdminPageLayout';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const AddButton = styled.button<{ themeMode: ThemeMode }>((props) => ({
  padding: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: theme[props.themeMode].submitButtonColor,
  color: '#f1f2f3'
}));

const PostContainer = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
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
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [posts] = useState<Post[]>(props.posts.reverse());

  return (
    <AdminPageLayout>
      <div style={{ width: '100%', padding: '0 5%' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <Link href='/admin/writer' passHref>
            <AddButton themeMode={themeMode}>Add</AddButton>
          </Link>
        </div>
        <Container>
          {posts.map((post) => {
            return (
              <PostContainer key={`${post.title}${post._id}`}>
                <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
                  <div
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        padding: '4px 8px 0px 8px'
                      }}
                    >
                      {post._id > 0 && (
                        <CircleRippleWrapper
                          onClick={() => {
                            // setDeletedPost({ isModalOpen: true, index });
                            alert('준비중');
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.25rem' }} />
                        </CircleRippleWrapper>
                      )}
                    </div>
                    <Content>
                      <PreviewTextWrapper>
                        <PreviewTitle>{post.title}</PreviewTitle>
                      </PreviewTextWrapper>
                    </Content>
                  </div>
                </BorderBox>
              </PostContainer>
            );
          })}
        </Container>
      </div>
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
