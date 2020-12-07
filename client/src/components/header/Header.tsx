import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { color } from 'resources';

const StyledHeader = styled.header({
  width: '100vw',
  height: '10vh',
  alignItems: 'center',
  borderBottom: '1px solid #ccc',
  padding: '5px 0',
  fontWeight: 'bold',
  position: 'fixed',
  top: '0'
});

const Container = styled.div({
  display: 'flex',
  width: '1300px',
  margin: '0 auto',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const BlogName = styled.div({
  fontSize: '25px',
  padding: '10px',
  cursor: 'pointer',
  userSelect: 'none',
  color: color.blogName
});

const SearchIcon = styled.div({
  fontSize: '25px',
  padding: '4px 10px',
  borderRadius: '50%',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#ccc'
  }
});

interface Props {
  name: string;
}

export function Header(props: Props) {
  return (
    <StyledHeader>
      <Link href='/' passHref>
        <Container>
          <BlogName>{props.name}</BlogName>
          <SearchIcon>
            <i className='fas fa-search'></i>
          </SearchIcon>
        </Container>
      </Link>
    </StyledHeader>
  );
}
