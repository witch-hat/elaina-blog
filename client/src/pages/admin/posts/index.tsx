import React, { useState } from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BorderBox} from 'src/components';
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
  height: '10rem'
});

const PreviewTextWrapper = styled.div({
  width: '100%',
  display: 'flex',
  height: '8.4rem',
  flexDirection: 'column',
  alignItems: 'flex-start'
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
  height: '4.5rem',
  fontSize: '1.1rem',
  margin: '.25rem 0 0',
  wordBreak: 'keep-all',
  textAlign: 'left',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

interface Props extends AppCommonProps {
  posts: Post[];
  author: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function PostProps(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [posts] = useState<Post[]>(props.posts);

  return (
    <AdminPageLayout>
        <div style={{ width: '100%', padding: '0 5%' }}>
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            {          
                  <a href="/admin/writer">
              <AddButton themeMode={themeMode}>
                      Add
              </AddButton>
                  </a>
                          }
          </div>
          <Container>
            {posts.map((post, index) => {
              
                return (
                  <PostContainer
                    key={post.title}
                    data-position={index}
                
                  >
                    <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div
                          style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '4px 8px 0px 8px' }}
                        >

                          {post._id > 0 && (
                            <CircleRippleWrapper
                              onClick={() => {
                                // setDeletedPost({ isModalOpen: true, index });
                                alert("준비중")
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.25rem' }} />
                            </CircleRippleWrapper>
                          )}
                      
                        </div>
                        <Content>
                          <PreviewTextWrapper>
                            <PreviewTitle>{post.title}</PreviewTitle>
                            <PreviewContent>{post.article}</PreviewContent>
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

export async function getServerSideProps(context: NextPageContext) {
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
}
