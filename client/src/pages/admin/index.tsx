import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import { PostType, GET_POSTS } from 'src/query/post';
import { trans, Lang } from 'src/resources/languages';
import { initApolloClient } from 'src/apollo/withApollo';
import { AppCommonProps, appCommponProps } from 'src/pages/_app';
import { AdminPageLayout, PageTitle, CommentLogBox } from 'src/components/pages/admin';
import { CommentLogDataType, GET_COMMENT_LOGS, CommentLogQueryType } from 'src/query/comment-log';
import { GET_CATEGORIES_WITH_DETAILS, CategoryDetailType, CategoryDetailsQueryType } from 'src/query/category';

interface ServerSideProps {
  logs: CommentLogDataType[];
  categoriesDetail: CategoryDetailType[];
  posts: PostType[];
}

interface Props extends AppCommonProps, ServerSideProps {}

const Container = styled.div({
  width: '100%'
});

export default function Admin(props: Props) {
  return (
    <AdminPageLayout>
      <Container>
        <PageTitle title={trans(Lang.Activities)} />
        {props.logs.map((log) => {
          /*category title 찾아주기*/
          const findCategoryTitle = props.categoriesDetail.find((category) => category._id === log.categoryId)?.title!;
          const findPostTitle = props.posts.find((post) => post._id === log._id)?.title!;
          return (
            <CommentLogBox
              key={log._id}
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
        destination: '/admin/login?url=%2Fadmin'
      }
    };
  }

  context.res.setHeader('Cache-Control', 'max-age=0, public, must-revalidate');

  const client = initApolloClient({}, context);
  const [{ data: CommentData }, { data: CategoryData }, { data: PostTitle }] = await Promise.all([
    client.query<CommentLogQueryType>({ query: GET_COMMENT_LOGS }),
    client.query<CategoryDetailsQueryType>({ query: GET_CATEGORIES_WITH_DETAILS }),
    client.query<{ posts: PostType[] }>({ query: GET_POSTS })
  ]);

  const logs = CommentData.commentLogs;
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
