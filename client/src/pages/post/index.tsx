import React from 'react';
import { GetServerSideProps } from 'next';

import { initApolloClient } from 'src/apollo/withApollo';
import { GET_LAST_POST } from 'src/query/post';

import PostId from './[post-id]';

interface ServerSideProps {}

interface Props extends ServerSideProps {}

export default function Post(props: Props) {
  return <div></div>;
}

const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const client = initApolloClient({}, context);
  const { data } = await client.query({ query: GET_LAST_POST });

  return {
    redirect: {
      permanent: false,
      destination: `/post/${data.lastPost._id}`
    }
  };
};
