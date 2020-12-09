import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { theme } from 'resources';
import { InputBox } from 'components';

const StyledHeader = styled.header({
  width: '100vw',
  height: '10vh',
  alignItems: 'center',
  borderBottom: '1px solid #ccc',
  padding: '5px 0',
  fontWeight: 'bold',
  position: 'fixed',
  top: '0',
  backgroundColor: '#fff',
  zIndex: 9999
});

const Container = styled.div({
  display: 'flex',
  width: '1300px',
  height: '100%',
  margin: '0 auto',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const BlogName = styled.div({
  fontSize: '1.8rem',
  padding: '10px',
  cursor: 'pointer',
  userSelect: 'none',
  color: theme.light.blogName
});

const SearchButton = styled.button({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '45px',
  height: '45px',
  margin: '0 10px',
  fontSize: '20px',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '#fff',
  cursor: 'pointer',
  '&:focus': {
    outline: 'none'
  },
  '&:hover': {
    backgroundColor: '#eee'
  }
});

const SearchForm = styled.form({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const Flex = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
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
          <Flex>
            <SearchForm method='GET' action='/search'>
              <InputBox placeholder='Search' id='search' minLength={2} maxLength={10} styles={{ width: '180px' }} />
              <SearchButton type='submit'>
                <i className='fas fa-search'></i>
              </SearchButton>
            </SearchForm>
          </Flex>
        </Container>
      </Link>
    </StyledHeader>
  );
}
