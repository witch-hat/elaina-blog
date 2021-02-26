import { NextPageContext } from 'next';
import React, { useState, useRef } from 'react';
import { initApolloClient } from 'src/apollo/withApollo';
import { GET_LAST_POST } from 'src/query/post';

import PostId from './[post-id]';

export default function Post() {
  return <PostId></PostId>;
}

export async function getServerSideProps(context: NextPageContext) {
  const client = initApolloClient({}, context);
  const { data } = await client.query({ query: GET_LAST_POST });

  return {
    redirect: {
      permanent: false,
      destination: `/post/${data.lastPost._id}`
    }
  };
}
