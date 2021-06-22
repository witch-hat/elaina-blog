import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSelector } from 'react-redux';
import {
  InferGetServerSidePropsType,
  NextPageContext,
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult
} from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSwatchbook } from '@fortawesome/free-solid-svg-icons';

import { useWidth, FocusWrapper } from 'src/components';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { initApolloClient } from 'src/apollo/withApollo';
import { FIND_POST_BY_URL, FIND_SAME_CATEGORY_POSTS, Post } from 'src/query/post';
import { GET_COMMENTS, Comments } from 'src/query/comment';
import { GET_PROFILE, ProfileType } from 'src/query/profile';
import { AppCommonProps } from 'src/pages/_app';

import { Article } from './component/article/Article';
import { CommentContainer } from './component/comment/CommentContainer';
import { PostCategory } from './component/PostCategory';
import { RightSideContainer } from './component/rightside/RightSideContainer';

// interface ContentContainerProps {
//   isOpenList: boolean;
//   themeMode: ThemeMode;
// }

const Container = styled.div({
  display: 'flex',
  width: '100%',
  maxWidth: '1480px',
  margin: '0 auto',
  justifyContent: 'stretch',
  alignItems: 'flex-start',
  '@media screen and (max-width: 1380px)': {
    width: '100%'
  },
  '@media screen and (max-width: 767px)': {
    overflowX: 'hidden'
  }
});

const ContentContainer = styled.section<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  flex: 3,
  margin: '0 2.5rem',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '.5rem',
  backgroundColor: theme[props.themeMode].articleBackground,
  '@media screen and (max-width: 1380px)': {
    width: '72%'
  },
  '@media screen and (max-width: 767px)': {
    width: '100%',
    margin: '0'
  }
}));

const Comment = styled.section({
  width: '100%'
});

const Rotate = keyframes({
  from: {
    transform: 'rotate(25deg)'
  },
  to: {
    transform: 'rotate(-25deg)'
  }
});

const PostCategoryMobileButton = styled.button<{ themeMode: ThemeMode; holdingButton: boolean }>(
  (props) => ({
    display: 'flex',
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    padding: '.85rem',
    borderRadius: '50%',
    backgroundColor: theme[props.themeMode].secondaryContentBackground,
    boxShadow: `0 6px 3px -3px ${theme[props.themeMode].shadowColor}`,
    alignItems: 'center',
    justifyContent: 'center'
  }),
  css<{ holdingButton: boolean }>`
    animation: ${(props) => props.holdingButton && Rotate} 0.2s infinite alternate linear;
  `
);

interface ServerSideProps {
  categoryId: number;
  post: Post;
  comment: Comments;
  sameCategoryTitles: [{ title: string; _id: number }];
  category: { title: string };
  profile: ProfileType;
}

interface Props extends AppCommonProps, ServerSideProps {}

export default function PostId(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const post: Post = props.post;
  const comments: Comments = props.comment;
  const titles: [{ title: string; _id: number }] = props.sameCategoryTitles;
  const category: { title: string } = props.category;
  const profile: ProfileType = props.profile;
  const categoryId: number = props.categoryId;
  let touchStartX: number;
  let touchStartY: number;
  let touchEndX: number;
  let touchEndY: number;

  const width = useWidth();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const commentRef = useRef<HTMLElement>(null);
  const [showPostCategory, setShowPostCategory] = useState(false);
  const [isHoldingButton, setIsHoldingButton] = useState(false);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  function handleTouchStart(event: React.TouchEvent<HTMLButtonElement>) {
    event.preventDefault();
    // setTimeout(() => setIsHoldingButton(true), 1000);
  }

  function handleTouchMove(event: React.TouchEvent<HTMLButtonElement>) {
    const newX = event.touches[0].clientX;
    const newY = event.touches[0].clientY;
    if (isHoldingButton && buttonRef.current) {
      buttonRef.current.style.left = `${newX}px`;
      buttonRef.current.style.top = `${newY}px`;
    }
  }

  function handleTouchEnd(event: React.TouchEvent<HTMLButtonElement>) {
    // event.preventDefault();
    if (isHoldingButton) {
      setIsHoldingButton(false);
    }
  }

  function scrollToComment() {
    window.scrollTo(0, commentRef.current?.offsetTop!);
  }

  return (
    <Container
    // onTouchStart={(event: React.TouchEvent) => handleTouchStart(event)}
    // onTouchEnd={(event: React.TouchEvent) => handleTouchEnd(event)}
    >
      {width > 767 ? (
        <PostCategory category={category} titles={titles} currentPostId={post._id} isLogin={props.app.isLogin} />
      ) : (
        <FocusWrapper visible={showPostCategory} onClickOutside={() => setShowPostCategory(false)}>
          <PostCategory category={category} titles={titles} currentPostId={post._id} isLogin={props.app.isLogin} />
        </FocusWrapper>
      )}
      <ContentContainer themeMode={themeMode}>
        <Article title={post.title} profile={profile} createdAt={post.createdAt} article={post.article} isLogin={props.app.isLogin} />
        <Comment ref={commentRef}>
          <CommentContainer
            comments={comments}
            isLogin={props.app.isLogin}
            author={profile.name!}
            categoryId={categoryId}
            postId={post._id}
          />
        </Comment>
      </ContentContainer>
      <RightSideContainer commentsCount={comments.count} scrollToComment={scrollToComment} />
      {width <= 767 && !showPostCategory && (
        <PostCategoryMobileButton
          themeMode={themeMode}
          holdingButton={isHoldingButton}
          onClick={() => setShowPostCategory(true)}
          onTouchStart={(e) => {
            handleTouchStart(e);
          }}
          onTouchMove={(e) => handleTouchMove(e)}
          onTouchEnd={(e) => handleTouchEnd(e)}
        >
          <FontAwesomeIcon icon={faSwatchbook} />
        </PostCategoryMobileButton>
      )}
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context: GetServerSidePropsContext) => {
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
        categoryId: findedPost.categoryId,
        post: findedPost,
        comment: findedComment,
        sameCategoryTitles: sameCategoryPostTitles.post,
        category: sameCategoryPostTitles.category,
        profile
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
};
