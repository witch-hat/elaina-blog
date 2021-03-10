import React from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import Link from 'next/link';

import { Post, SEARCH } from 'src/query/post';
import { initApolloClient } from 'src/apollo/withApollo';

interface Props {
  posts: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function KeywordFinder(props: Props) {
  const posts: Post[] = props.posts;

  if (posts.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }
  return (
    <div>
      {posts.map((post) => {
        return (
          <Link href={`/post/${post._id}`}>
            <div>{post.title}</div>
          </Link>
        );
      })}
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const keyword = context.query['keyword'];
  const client = initApolloClient({}, context);

  const { data } = await client.query({ query: SEARCH, variables: { keyword } });

  const posts = data.search;

  return {
    props: {
      posts
    }
  };
}
