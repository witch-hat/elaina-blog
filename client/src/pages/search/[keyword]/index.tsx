import React from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import Link from 'next/link';

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
  marginBottom: '.25rem'
});

const CreatedAt = styled.p({
  display: 'block',
  fontSize: '.8rem',
  marginBottom: '.25rem'
});

const Article = styled.p({
  width: '100%',
  height: '3rem',
  fontSize: '1rem',
  wordBreak: 'keep-all',
  textAlign: 'left',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
});

interface Props {
  titleSearchResult: InferGetServerSidePropsType<typeof getServerSideProps>;
  articleSearchResult: InferGetServerSidePropsType<typeof getServerSideProps>;
}

export default function KeywordFinder(props: Props) {
  const titleSearchResult: Post[] = props.titleSearchResult;
  const articleSearchResult: Post[] = props.articleSearchResult;

  if (titleSearchResult.length === 0 && articleSearchResult.length === 0) {
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
          <Title>{`제목 검색 결과 ${titleSearchResult.length}건`}</Title>
        </TitleContainer>
        <PostWrapper>
          {titleSearchResult.map((post) => {
            const createdAt = new Date(post.createdAt);
            const formatHelper = new FormatUnifier.FormatDate();
            return (
              <Link key={post._id} href={`/post/${post._id}`} passHref>
                <a style={{ width: '100%' }}>
                  <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
                    <Content>
                      <PostTitle>{post.title}</PostTitle>
                      <CreatedAt>{formatHelper.getFullFormatDate(createdAt)}</CreatedAt>
                      <Article>{post.article}</Article>
                    </Content>
                  </BorderBox>
                </a>
              </Link>
            );
          })}
        </PostWrapper>
      </ResultWrapper>
      <ResultWrapper>
        <TitleContainer>
          <Title>{`본문 내 검색 결과 ${articleSearchResult.length}건`}</Title>
        </TitleContainer>
        <PostWrapper>
          {articleSearchResult.map((post) => {
            const createdAt = new Date(post.createdAt);
            const formatHelper = new FormatUnifier.FormatDate();
            return (
              <Link key={post._id} href={`/post/${post._id}`} passHref>
                <a style={{ width: '100%' }}>
                  <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
                    <Content>
                      <PostTitle>{post.title}</PostTitle>
                      <CreatedAt>{formatHelper.getFullFormatDate(createdAt)}</CreatedAt>
                      <Article>{post.article}</Article>
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

  const titleSearchResult = data.search.titleSearchResult;
  const articleSearchResult = data.search.articleSearchResult;

  return {
    props: {
      titleSearchResult,
      articleSearchResult
    }
  };
}
