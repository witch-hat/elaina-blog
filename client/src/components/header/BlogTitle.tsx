import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const BlogName = styled.a((props) => ({
  padding: '10px',
  color: props.theme.blogName,
  fontSize: '1.8rem',
  cursor: 'pointer'
}));

interface Props {
  name: string;
}

function BlogTitle(props: Props) {
  return (
    <Link href='/' passHref>
      <BlogName>{props.name}</BlogName>
    </Link>
  );
}

export const MemoizedBlogTitle = React.memo(BlogTitle);
