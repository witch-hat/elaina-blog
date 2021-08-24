import React from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
// import remarkGfm from 'remark-gfm';
// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

// import styles from 'src/styles/markdown-styles.module.css';

const Viewer = dynamic<{ content: string }>(() => import('src/components/common/md-viewer/Viewer').then((mod) => mod.MDViewer));

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
    <StyledArticle id={'styled-article'}>
      <Viewer content={props.article} />
    </StyledArticle>
  );
}

export const MemoizedArticle = React.memo(Article);
