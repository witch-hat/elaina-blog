import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import { initApolloClient } from 'src/apollo/withApollo';
import { CommentEvent, CommentLog, GET_COMMENT_LOGS } from 'src/query/comment-log';
import CommnetLogBox from 'src/pages/admin/component/CommentLogItem/CommentLogBox';
import { GET_CATEGORIES_WITH_DETAILS, CategoryDetails } from 'src/query/category';
import { Post, GET_POSTS } from 'src/query/post';

import { AdminPageLayout } from './component/AdminPageLayout';
import { AppCommonProps, appCommponProps } from '../_app';

interface ServerSideProps {
  logs: CommentLog[];
  categoriesDetail: CategoryDetails[];
  posts: Post[];
}

interface Props extends AppCommonProps, ServerSideProps {}

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '.9rem 0',
  flexDirection: 'column'
});

export default function Admin(props: Props) {
  return (
    <AdminPageLayout>
      <Container>
        {props.logs.map((log, index) => {
          const findCategoryTitle = props.categoriesDetail.find((category) => category._id === log.categoryId)?.title!;
          const findPostTitle = props.posts.find((post) => post._id === log._id)?.title!;
          return (
            <CommnetLogBox
              key={`${log._id}`}
              isEvent={log.replyIndex}
              time={log.time}
              postId={log.postId}
              categoryTitle={findCategoryTitle}
              postTitle={findPostTitle}
            />
          );
        })}
      </Container>
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
  const { data: CommentData } = await client.query({ query: GET_COMMENT_LOGS });
  const { data: CategoryData } = await client.query({ query: GET_CATEGORIES_WITH_DETAILS });
  const { data: PostTitle } = await client.query({ query: GET_POSTS });
  const logs: CommentLog[] = CommentData.commentLogs;
  const categoriesDetail = CategoryData.categoriesWithDetails;
  const posts = PostTitle.posts;
  return {
    props: {
      logs,
      categoriesDetail,
      posts
    }
  };
};
