import React from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import { initApolloClient } from 'src/lib/withApollo';
import { GET_LATEST_POSTS, GetLastestPostsQueryType, GetLatestPostsVars, PostDetailDataType } from 'src/query/post';
import { GET_CATEGORIES_WITH_DETAILS, CategoryDetailType, CategoryDetailsQueryType } from 'src/query/category';
import { GET_PROFILE, ProfileDataType, GetProfileQueryType } from 'src/query/profile';
import { AboutDataType, AboutQueryType, GET_ABOUT } from 'src/query/about';
import { AppCommonProps, appCommponProps } from 'src/pages/_app';

import { MainPageLayout, MemoizedContentCategory, MemoizedPostContainer, AboutPage } from 'src/components/pages/main';

interface ServerSideProps {
  latestPosts: PostDetailDataType[];
  profile: ProfileDataType;
  categories: CategoryDetailType[];
  about: AboutDataType;
}

interface Props extends AppCommonProps, ServerSideProps {}

export default function Index(props: Props) {
  const router = useRouter();

  if (router.query.tab === 'about') {
    return (
      <MainPageLayout profile={props.profile} isLogin={props.app.isLogin}>
        <AboutPage name={props.profile.name} about={props.about} isLogin={props.app.isLogin} />
      </MainPageLayout>
    );
  }

  if (router.query.tab === 'category') {
    return (
      <MainPageLayout profile={props.profile} isLogin={props.app.isLogin}>
        <MemoizedContentCategory categories={props.categories} isLogin={props.app.isLogin} />
      </MainPageLayout>
    );
  }

  return (
    <MainPageLayout profile={props.profile} isLogin={props.app.isLogin}>
      <MemoizedPostContainer posts={props.latestPosts} />
    </MainPageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  context.res.setHeader('Cache-Control', 'max-age=0, public, must-revalidate');

  const { edit } = context.query;

  if (edit && edit !== 'true') {
    return {
      redirect: {
        permanent: true,
        destination: '/?tab=about'
      }
    };
  }

  if (edit && !appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login?url=%2F'
      }
    };
  }

  const apolloClient = initApolloClient({}, context);
  const [profileQueryResult, categoryQueryResult, aboutQueryResult, latestPostsQueryResult] = await Promise.all([
    apolloClient.query<GetProfileQueryType>({ query: GET_PROFILE }),
    apolloClient.query<CategoryDetailsQueryType>({ query: GET_CATEGORIES_WITH_DETAILS }),
    apolloClient.query<AboutQueryType>({ query: GET_ABOUT }),
    apolloClient.query<GetLastestPostsQueryType, GetLatestPostsVars>({
      query: GET_LATEST_POSTS,
      variables: {
        page: 1
      }
    })
  ]);

  const about = aboutQueryResult.data.about;
  const profile = profileQueryResult.data.profile;
  const categories = categoryQueryResult.data.categoriesWithDetails;
  const latestPosts = latestPostsQueryResult.data.getLatestPosts;

  return {
    props: {
      latestPosts,
      profile,
      categories,
      about
    }
  };
};
