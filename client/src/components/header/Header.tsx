import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { color } from 'resources';

const StyledHeader = styled.header({
  width: '100vw',
  height: '10vh',
  display: 'flex',
  alignItems: 'center',
  borderBottom: '1px solid #ccc',
  padding: '5px 10vw',
  fontWeight: 'bold',
  position: 'fixed',
  top: '0'
});

const BlogName = styled.div({
  fontSize: '25px',
  padding: '15px 10px',
  cursor: 'pointer',
  userSelect: 'none',
  color: color.blogName
});

interface Props {
  name: string;
}

export function Header(props: Props) {
  return (
    <StyledHeader>
      <Link href='/' passHref>
        <BlogName>{props.name}</BlogName>
      </Link>
    </StyledHeader>
  );
}
