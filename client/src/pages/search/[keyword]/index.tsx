import React from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import Link from 'next/link';

import { Post, SEARCH } from 'src/query/post';
import { initApolloClient } from 'src/apollo/withApollo';

interface Props {
  titleSearchResult: InferGetServerSidePropsType<typeof getServerSideProps>;
  articleSearchResult: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function KeywordFinder(props: Props) {
  const titleSearchResult: Post[] = props.titleSearchResult;
  const articleSearchResult: Post[] = props.articleSearchResult;

  if (titleSearchResult.length === 0 && articleSearchResult.length === 0) {
    return <div>검색 결과가 없습니다.</div>;
  }

  return (
    <div>
      <div>
        <div>
          <p>{`제목 검색 결과 ${titleSearchResult.length}건`}</p>
        </div>
        {titleSearchResult.map((post) => {
          return (
            <Link href={`/post/${post._id}`}>
              <div>{post.title}</div>
            </Link>
          );
        })}
      </div>
      <div>
        <div>
          <p>{`본문 내 검색 결과 ${articleSearchResult.length}건`}</p>
        </div>
        {articleSearchResult.map((post) => {
          return (
            <Link href={`/post/${post._id}`}>
              <div>{post.title}</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const keyword = context.query['keyword'];
  const client = initApolloClient({}, context);

  const { data } = await client.query({ query: SEARCH, variables: { keyword } });

  const titleSearchResult = data.search.titleSearchResult;
  const articleSearchResult = data.search.articleSearchResult;

  return {
    props: {
      titleSearchResult,
      articleSearchResult
    }
  };
}
