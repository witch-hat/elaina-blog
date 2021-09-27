import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useQuery } from '@apollo/client';

import { AppCommonProps } from 'src/pages/_app';
import { initializeApollo } from 'src/lib/apollo';
import {
  FindPostByIdQueryType,
  FindPostByIdVars,
  FIND_POST_BY_ID,
  GetNearPostVars,
  GetNextPostQueryType,
  GetPrevPostQueryType,
  GET_NEXT_POST,
  GET_PREV_POST,
  PostDetailDataType
} from 'src/query/post';
import { GET_PROFILE, ProfileDataType, GetProfileQueryType } from 'src/query/profile';
import { GET_COMMENTS, GetCommentsQueryType, GetCommentVars } from 'src/query/comment';
import { ArticleContainer, CommentContainer, RightSideContainer } from 'src/components/pages/post';
import { ClapBox } from 'src/components/pages/post/ClapBox';
import { RelatedPostsContainer } from 'src/components/pages/post/RelatedPosts';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  maxWidth: '1000px',
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

const ContentContainer = styled.section((props) => ({
  display: 'flex',
  flex: 3,
  margin: '0 2.5rem',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '.5rem',
  backgroundColor: props.theme.articleBackground,
  '@media screen and (max-width: 1380px)': {
    width: '72%'
  },
  '@media screen and (max-width: 767px)': {
    width: '100%',
    margin: '0'
  }
}));

interface ServerSideProps {
  categoryId: number;
  post: PostDetailDataType;
  profile: ProfileDataType;
  prevPost: PostDetailDataType | null;
  nextPost: PostDetailDataType | null;
}

interface Props extends AppCommonProps, ServerSideProps {}

export default function PostId(props: Props) {
  const router = useRouter();

  const _id = router.query['pid'] as string;

  const { data, loading } = useQuery<GetCommentsQueryType, GetCommentVars>(GET_COMMENTS, {
    variables: {
      pid: +_id
    }
  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  if (loading || !data) {
    return null;
  }

  return (
    <Container>
      <ContentContainer>
        <ArticleContainer
          title={props.post.title}
          profile={props.profile}
          createdAt={props.post.createdAt}
          article={props.post.article}
          isLogin={props.app.isLogin}
        />
        <ClapBox id={parseInt(_id)} initLikeCount={props.post.likeCount} commentsCount={data.comments.count} />
        <RelatedPostsContainer prevPost={props.prevPost} nextPost={props.nextPost} />
        <CommentContainer
          comments={data.comments}
          isLogin={props.app.isLogin}
          author={props.profile.name!}
          categoryId={props.categoryId}
          postId={props.post._id}
        />
      </ContentContainer>
      <RightSideContainer />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context: GetServerSidePropsContext) => {
  // context.res.setHeader('Cache-Control', 'max-age=0, public, must-revalidate');

  const id = context.query['pid'];

  if (!id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  try {
    const client = initializeApollo({}, context);

    const postQueryResult = await client.query<FindPostByIdQueryType, FindPostByIdVars>({
      query: FIND_POST_BY_ID,
      variables: { id: `${id}` }
    });
    const findedPost = postQueryResult.data.findPostById;

    if (!findedPost) {
      return {
        notFound: true
      };
    }

    const [profileQueryResult, prevPostQueryResult, nextPostQueryResult] = await Promise.all([
      client.query<GetProfileQueryType>({ query: GET_PROFILE }),
      client.query<GetPrevPostQueryType, GetNearPostVars>({
        query: GET_PREV_POST,
        variables: { hereId: parseInt(`${id}`) }
      }),
      client.query<GetNextPostQueryType, GetNearPostVars>({
        query: GET_NEXT_POST,
        variables: { hereId: parseInt(`${id}`) }
      })
    ]);
    const profile = profileQueryResult.data.profile;
    const prevPost = prevPostQueryResult.data.getPrevPost;
    const nextPost = nextPostQueryResult.data.getNextPost;

    return {
      props: {
        categoryId: findedPost.categoryId,
        post: findedPost,
        profile,
        prevPost,
        nextPost
      }
    };
  } catch (err) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }
};
