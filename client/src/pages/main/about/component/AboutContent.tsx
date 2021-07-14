import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import styles from 'src/styles/markdown-styles.module.css';

const Article = styled.article({
  marginTop: '1.5rem',
  padding: '0 1rem'
});

interface Props {
  content: string;
}

function AboutContent(props: Props) {
  return (
    <Article>
      <ReactMarkdown plugins={[gfm]} className={styles['markdown-body']}>
        {props.content}
      </ReactMarkdown>
    </Article>
  );
}

export const MemoizedAboutContent = React.memo(AboutContent);
