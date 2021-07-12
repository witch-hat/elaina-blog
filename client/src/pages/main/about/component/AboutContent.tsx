import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

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
      <ReactMarkdown plugins={[gfm]}>{props.content}</ReactMarkdown>
    </Article>
  );
}

export const MemoizedAboutContent = React.memo(AboutContent);
