import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import { initApolloClient } from 'src/apollo/withApollo';
import { CommentLog, GET_COMMENT_LOGS } from 'src/query/comment-log';
import CommnetLogBox from 'src/pages/admin/component/CommentLogItem/CommentLogBox';

import { AdminPageLayout } from './component/AdminPageLayout';
import { AppCommonProps, appCommponProps } from '../_app';

interface ServerSideProps {
  logs: CommentLog[];
}

interface Props extends AppCommonProps, ServerSideProps {}

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '.9rem 0',
  flexDirection: 'column',
  '& > div:nth-child(1)': {
    margin: '0 0 .8rem !important'
  }
});

export default function Admin(props: Props) {
  return (
    <AdminPageLayout>
      <Container>
        {props.logs.map((log, index) => {
          return (
            <CommnetLogBox key={`${log._id}`} _id={log._id} time={log.time} postId={log.postId} CategoryId={log.categoryId}></CommnetLogBox>
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
  const { data } = await client.query({ query: GET_COMMENT_LOGS });
  const logs = data.commentLogs;
  return {
    props: {
      logs
    }
  };
};
