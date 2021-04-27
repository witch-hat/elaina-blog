import React from 'react';
import styled from 'styled-components';

import { Post } from 'src/query/post';
import { ResultItem } from './ResultItem';

const Container = styled.div({
  width: '100%',
  padding: '0 5%'
});

interface Props {
  searchResults: { post: Post; content: string }[];
}

export function ResultContainer(props: Props) {
  return (
    <Container>
      {props.searchResults.map((result) => {
        const createdAt = new Date(result.post.createdAt);
        return <ResultItem key={`${result.post._id}`} title={result.post.title} createdAt={createdAt} article={result.content} />;
      })}
    </Container>
  );
}
