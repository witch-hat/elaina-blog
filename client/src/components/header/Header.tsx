import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { ThemeMode } from 'src/redux/common/type';
import { theme } from 'src/resources';
import { InputBox } from 'src/components';
import { ModeSwitch } from './ModeSwitch';
import AdminMenuButton from './AdminMenuButton';

const StyledHeader = styled.header<{ themeMode: ThemeMode }>((props) => {
  return {
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    padding: '.5rem 0',
    fontWeight: 'bold',
    position: 'fixed',
    top: '0',
    zIndex: 9999,
    height: '5rem',
    backgroundColor: theme[props.themeMode].backgroundColor
  };
});

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '0 4rem',
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
  marginLeft: '5px',
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
  width: 'max-content',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

interface Props {
  name: string;
  theme: ThemeMode;
}

export function Header(props: Props) {
  return (
    <StyledHeader themeMode={props.theme}>
      <Container>
        <Link href='/' passHref>
          <BlogName>{props.name}</BlogName>
        </Link>
        <Flex>
          <ModeSwitch />
          <SearchForm method='GET' action='/search'>
            <InputBox placeholder='Search' id='search' minLength={2} maxLength={10} styles={{ width: '180px' }} />
            <SearchButton type='submit'>
              <i className='fas fa-search'></i>
            </SearchButton>
          </SearchForm>
          <AdminMenuButton />
        </Flex>
      </Container>
    </StyledHeader>
  );
}
