import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import { trans, Lang } from 'src/resources/languages';
import { initializeApollo } from 'src/lib/apollo';
import { AppCommonProps, appCommponProps } from 'src/pages/_app';
import { AdminPageLayout, PageTitle, CommentLogBox } from 'src/components/pages/admin';
import { CommentLogDataType, GET_COMMENT_LOGS, CommentLogQueryType, CommentLogVars } from 'src/query/comment-log';

interface ServerSideProps {
  logs: CommentLogDataType[];
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
          // const findCategoryTitle = props.categoriesDetail.find((category) => category._id === log.categoryId)?.title!;
          // const findPostTitle = props.posts.find((post) => post._id === log._id)?.title!;
          return (
            <CommentLogBox
              key={log._id}
              isEvent={log.replyIndex}
              time={log.time}
              postId={log.postId}
              categoryTitle={'카테고리 제목은 없어도 될듯'}
              postTitle={log.postTitle}
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

  const client = initializeApollo({}, context);
  const { data: CommentData } = await client.query<CommentLogQueryType, CommentLogVars>({
    query: GET_COMMENT_LOGS,
    variables: { page: 1 }
  });

  const logs = CommentData.commentLogs;

  return {
    props: {
      logs
    }
  };
};
