import React from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import Link from 'next/link';
import Gfm from 'remark-gfm';
import ReactMarkDown from 'react-markdown';
import { Reset } from 'styled-reset';

import { Post, SEARCH } from 'src/query/post';
import { initApolloClient } from 'src/apollo/withApollo';
import { BorderBox } from 'src/components';
import { FormatUnifier } from 'src/utils';

const Container = styled.div<{ isEmptyResult?: boolean }>((props) => ({
  width: '100%',
  height: props.isEmptyResult ? 'calc(100vh - 5rem - 20px)' : 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: props.isEmptyResult ? 'center' : 'flex-start',
  justifyContent: props.isEmptyResult ? 'center' : 'flex-start',
  ['& > div:first-child']: {
    marginTop: '0'
  }
}));

const ResultWrapper = styled.div({
  width: '100%',
  padding: '0 15%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '1rem 0'
});

const TitleContainer = styled.div({
  alignSelf: 'flex-start'
});

const Title = styled.p({
  fontSize: '1.3rem',
  fontWeight: 'bold',
  marginBottom: '.5rem'
});

const PostWrapper = styled.div({
  width: '100%',
  padding: '0 5%'
});

const Content = styled.div({
  width: '100%',
  height: '7.5rem',
  padding: '.5rem'
});

const PostTitle = styled.p({
  display: 'block',
  fontSize: '1.125rem',
  fontWeight: 'bold',
  marginBottom: '.5rem'
});

const CreatedAt = styled.p({
  display: 'block',
  fontSize: '.8rem',
  marginBottom: '.5rem'
});

const Article = styled.p({
  width: '100%',
  height: '3rem',
  fontSize: '1rem',
  wordBreak: 'keep-all',
  textAlign: 'left',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

interface Props {
  searchResult: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function KeywordFinder(props: Props) {
  const searchResults: { post: Post; content: string }[] = props.searchResult;

  if (searchResults.length === 0) {
    return (
      <Container isEmptyResult>
        <p>검색 결과가 없습니다.</p>
      </Container>
    );
  }

  return (
    <Container>
      <ResultWrapper>
        <TitleContainer>
          <Title>{`검색 결과 ${searchResults.length}건`}</Title>
        </TitleContainer>
        <PostWrapper>
          {searchResults.map((result) => {
            const createdAt = new Date(result.post.createdAt);
            const formatHelper = new FormatUnifier.FormatDate();
            return (
              <Link key={result.post._id} href={`/post/${result.post._id}`} passHref>
                <a style={{ width: '100%' }}>
                  <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
                    <Content>
                      <PostTitle>{result.post.title}</PostTitle>
                      <CreatedAt>{formatHelper.getFullFormatDate(createdAt)}</CreatedAt>
                      <Article>
                        <Reset />
                        <ReactMarkDown>{result.content}</ReactMarkDown>
                      </Article>
                    </Content>
                  </BorderBox>
                </a>
              </Link>
            );
          })}
        </PostWrapper>
      </ResultWrapper>
    </Container>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const keyword = context.query['keyword'];
  const client = initApolloClient({}, context);

  const { data } = await client.query({ query: SEARCH, variables: { keyword } });

  const searchResult = data.search.result;

  return {
    props: {
      searchResult
    }
  };
}
