import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import styles from 'src/styles/MarkdownStyles.module.css';

const StyledArticle = styled.article({
  width: '100%',
  marginTop: '2rem',
  fontSize: '1.1rem',
  wordBreak: 'keep-all'
});

interface Props {
  article: string;
}

function Article(props: Props) {
  return (
    <StyledArticle>
      <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']}>
        {props.article}
      </ReactMarkdown>
    </StyledArticle>
  );
}

export const MemoizedArticle = React.memo(Article);
