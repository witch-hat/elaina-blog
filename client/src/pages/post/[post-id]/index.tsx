import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { InferGetServerSidePropsType, NextPageContext } from 'next';

import { Content, ContentNavigation, PostCategory, CommentContainer } from './component';
import { useWidth, FocusWrapper } from 'src/components';
import { theme } from 'src/styles';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { initApolloClient } from 'src/apollo/withApollo';
import { FIND_POST_BY_URL, FIND_SAME_CATEGORY_POSTS, Post } from 'src/query/post';
import { GET_COMMENTS, Comments } from 'src/query/comment';
import { GET_PROFILE } from 'src/query';
import { AppCommonProps } from 'src/pages/_app';

// interface ContentContainerProps {
//   isOpenList: boolean;
//   themeMode: ThemeMode;
// }

const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '@media screen and (max-width: 767px)': {
    overflowX: 'hidden'
  }
});

const ContentContainer = styled.div<{ themeMode: ThemeMode }>((props) => ({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '12px',
  backgroundColor: theme[props.themeMode].articleBackground,
  '@media screen and (max-width: 1380px)': {
    width: '72%'
  },
  '@media screen and (max-width: 767px)': {
    width: '100%'
  }
}));

const Index = styled.div({
  display: 'none',
  '@media screen and (max-width: 767px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.125)',
    width: '7%',
    position: 'sticky',
    top: 'calc(5rem + 20px)',
    height: '120px',
    borderRadius: '0 12px 12px 0',
    maxWidth: '30px',
    minWidth: '18px'
  }
});

const StyledP = styled.p({
  display: 'inline-block',
  transform: 'rotate(90deg)',
  color: '#222324',
  fontWeight: 'bold',
  flexShrink: 0
});

const FadeOut = keyframes({
  from: {
    opacity: 1
  },
  to: {
    opacity: 0
  }
});

const Alert = styled.div(
  {
    position: 'fixed',
    top: '50%',
    width: '150px',
    height: '150px',
    backgroundColor: 'rgba(0,0,0,.8)',
    color: '#f1f2f3',
    padding: '.5rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center'
  },
  css`
    animation: 2.5s ${FadeOut} 1s forwards;
  `
);

interface Props extends AppCommonProps {
  post: InferGetServerSidePropsType<typeof getServerSideProps>;
  comment: InferGetServerSidePropsType<typeof getServerSideProps>;
  sameCategoryTitles: InferGetServerSidePropsType<typeof getServerSideProps>;
  category: InferGetServerSidePropsType<typeof getServerSideProps>;
  author: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function PostId(props: Props) {
  const post: Post = props.post;
  const comment: Comments = props.comment;
  const titles: [{ title: string; _id: number }] = props.sameCategoryTitles;
  const category: { title: string } = props.category;
  const author: string = props.author;
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const width = useWidth();
  const [showPostCategory, setShowPostCategory] = useState(false);
  const isAlerted = useRef<boolean>(false);
  let touchStartX: number;
  let touchStartY: number;
  let touchEndX: number;
  let touchEndY: number;

  function handleTouchStart(event: React.TouchEvent) {
    if (width <= 767) {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (width <= 767) {
      const touch = event.changedTouches[event.changedTouches.length - 1];
      touchEndX = touch.clientX;
      touchEndY = touch.clientY;

      const touchOffsetX = touchEndX - touchStartX;
      const touchOffsetY = touchEndY - touchStartY;

      if (Math.abs(touchOffsetX) >= 50 && Math.abs(touchOffsetY) <= 20) {
        if (touchOffsetX > 0) {
          setShowPostCategory(true);
        } else {
          setShowPostCategory(false);
        }
      }
    }
  }

  return (
    <Container
      onTouchStart={(event: React.TouchEvent) => handleTouchStart(event)}
      onTouchEnd={(event: React.TouchEvent) => handleTouchEnd(event)}
    >
      {width > 767 ? (
        <PostCategory category={category} titles={titles} currentPostId={post._id} />
      ) : (
        <FocusWrapper visible={showPostCategory} onClickOutside={() => setShowPostCategory(false)}>
          <PostCategory category={category} titles={titles} currentPostId={post._id} />
        </FocusWrapper>
      )}
      <ContentContainer themeMode={themeMode}>
        <Content title={post.title} author={author} createdAt={post.createdAt} article={post.article} isLogin={props.app.isLogin} />
        <CommentContainer comment={comment} />
      </ContentContainer>
      <ContentNavigation />
      {/* TODO: Alert shows only first... */}
      {width <= 767 && !isAlerted.current.valueOf() && (
        <Alert onAnimationEnd={() => (isAlerted.current = true)}>
          <p style={{ fontSize: '1.3rem' }}>Swipe LEFT to RIGHT to show list</p>
        </Alert>
      )}
    </Container>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const requestUrl = context.query['post-id'];
  try {
    const client = initApolloClient({}, context);

    const postQueryResult = await client.query({ query: FIND_POST_BY_URL, variables: { requestUrl } });
    const findedPost = postQueryResult.data.findPostByUrl;

    const commentQueryResult = await client.query({ query: GET_COMMENTS, variables: { _id: findedPost._id } });
    const findedComment = commentQueryResult.data.comments;

    const profileQueryResult = await client.query({ query: GET_PROFILE });
    const profile = profileQueryResult.data.profile;

    const sameCategoryQueryResult = await client.query({
      query: FIND_SAME_CATEGORY_POSTS,
      variables: { categoryId: findedPost.categoryId }
    });
    const sameCategoryPostTitles = sameCategoryQueryResult.data.findSameCategoryPosts;

    return {
      props: {
        post: findedPost,
        comment: findedComment,
        sameCategoryTitles: sameCategoryPostTitles.post,
        category: sameCategoryPostTitles.category,
        author: profile.name
      }
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }
}
