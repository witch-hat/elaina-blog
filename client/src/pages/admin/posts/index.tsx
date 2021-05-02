import React, { useState } from 'react';
import styled from 'styled-components';
// import { NextPageContext } from 'next';
import { InferGetServerSidePropsType, NextPageContext } from 'next';

import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faTrash } from '@fortawesome/free-solid-svg-icons';

import { BorderBox, AlertBox, AlertStateType } from 'src/components';
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

const GrabButtonContainer = styled.div({
  '&:hover > *': {
    cursor: 'grab'
  }
});

const Input = styled.input<{ themeMode: ThemeMode }>((props) => ({
  display: 'inline-block',
  width: '100%',
  height: '2rem',
  fontSize: '1.1rem',
  padding: '.2rem',
  outline: 'none',
  fontWeight: 'normal',
  border: `1px solid ${theme[props.themeMode].inputBorder}`,
  borderRadius: '.5rem',
  color: theme[props.themeMode].inputText,
  backgroundColor: theme[props.themeMode].inputBackground
}));






const ContentContainer = styled.div<{ themeMode: ThemeMode }>((props) => ({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '.5rem',
  backgroundColor: theme[props.themeMode].articleBackground,
  '@media screen and (max-width: 1380px)': {
    width: '72%'
  },
  '@media screen and (max-width: 767px)': {
    width: '100%'
  }
}));



interface Props extends AppCommonProps {
  posts: Post[];
  author: InferGetServerSidePropsType<typeof getServerSideProps>;

}

export default function PostProps(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const initAlertState: AlertStateType = { msg: '', isPop: false, isError: false };

  const [grabbedElement, setGrabbedElement] = useState<(EventTarget & HTMLDivElement) | null>(null);
  const [grabbingPostIndex, setGrabbingCPostIndex] = useState<number>(-1);
  const [posts, setPosts] = useState<Post[]>(props.posts);
  const [deletedCategory, setDeletedPost] = useState<{ isModalOpen: boolean; index?: number }>({ isModalOpen: false });

  const [alertState, setAlertState] = useState<AlertStateType>(initAlertState);

  const author: string = props.author;


  function onDragStart(e: React.DragEvent<HTMLDivElement>) {
    setGrabbedElement(e.currentTarget);
    e.dataTransfer.effectAllowed = 'move';
    // @ts-ignore
    e.dataTransfer.setData('text/html', e.currentTarget);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function onDragEnd(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.dropEffect = 'move';
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    let grabPosition = Number(grabbedElement?.dataset.position);
    let dropPosition = Number(e.currentTarget.dataset.position);

    try {
      const newCategories = [...posts];
      newCategories[grabPosition] = newCategories.splice(dropPosition, 1, newCategories[grabPosition])[0];

      setAlertState(initAlertState);


      setPosts(newCategories);
      setGrabbingCPostIndex(-1);
    } catch (err) {
      const backUpCategories = [...posts];

      setPosts(backUpCategories);
      setAlertState({
        msg: err.message,
        isPop: true,
        isError: true
      });
    }
  }

  return (
    <AdminPageLayout>
      <>
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
                    draggable={grabbingPostIndex === index}
                    onDragOver={(e: React.DragEvent<HTMLDivElement>) => onDragOver(e)}
                    onDragStart={(e: React.DragEvent<HTMLDivElement>) => grabbingPostIndex > -1 && onDragStart(e)}
                    onDragEnd={(e: React.DragEvent<HTMLDivElement>) => grabbingPostIndex > -1 && onDragEnd(e)}
                    onDrop={(e: React.DragEvent<HTMLDivElement>) => grabbingPostIndex > -1 && onDrop(e)}
                  >
                    <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div
                          style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '4px 8px 0px 8px' }}
                        >

                          {post._id > 0 && (
                            <CircleRippleWrapper
                              onClick={() => {
                                setDeletedPost({ isModalOpen: true, index });
                              }}
                            >
                              <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.25rem' }} />
                            </CircleRippleWrapper>
                          )}
                          <GrabButtonContainer
                            onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                              if (e.button === 0) {
                                setGrabbingCPostIndex(index);
                              } else {
                                setGrabbingCPostIndex(-1);
                              }
                            }}
                            onMouseUp={() => {
                              setGrabbingCPostIndex(-1);
                            }}
                            onTouchStart={() => setGrabbingCPostIndex(index)}
                          >
                            <CircleRippleWrapper onClick={() => {}}>
                              <FontAwesomeIcon icon={faGripVertical} style={{ fontSize: '1.25rem' }} />
                            </CircleRippleWrapper>
                          </GrabButtonContainer>
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
        {alertState.isPop && (
          <AlertBox
            isError={alertState.isError}
            msg={alertState.msg}
            onCloseButtonClick={() => {
              setAlertState(initAlertState);
            }}
          />
        )}
      </>
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
