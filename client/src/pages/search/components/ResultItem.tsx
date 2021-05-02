import React from 'react';
import styled, { css } from 'styled-components';
import Link from 'next/link';
import Gfm from 'remark-gfm';
import ReactMarkDown from 'react-markdown';
import Reset from 'styled-reset';

import { BorderBox } from 'src/components';
import { FormatUnifier } from 'src/utils';

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

const Article = styled.div(
  {
    width: '100%',
    height: '3rem',
    fontSize: '1rem',
    wordBreak: 'keep-all',
    textAlign: 'left',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
  },
  css`
    ${Reset}
  `
);

interface Props {
  id: number;
  title: string;
  createdAt: Date;
  article: string;
}

export function ResultItem(props: Props) {
  return (
    <Link href={`/post/${props.id}`} passHref>
      <a style={{ width: '100%' }}>
        <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
          <Content>
            <PostTitle>{props.title}</PostTitle>
            <CreatedAt>{FormatUnifier.getFullFormatDate(props.createdAt)}</CreatedAt>
            <Article>
              <ReactMarkDown plugins={[Gfm]}>{props.article}</ReactMarkDown>
            </Article>
          </Content>
        </BorderBox>
      </a>
    </Link>
  );
}
