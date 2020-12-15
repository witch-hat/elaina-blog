import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';

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
  justifyContent: 'space-between',
  '@media screen and (max-width: 768px)': {
    padding: '0 1rem'
  }
});

const BlogName = styled.div({
  fontSize: '1.8rem',
  padding: '10px',
  cursor: 'pointer',
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

const MobileMenuButton = styled.div({
  display: 'none',
  padding: '.5rem',
  fontSize: '1.5rem',
  '@media screen and (max-width: 768px)': {
    display: 'block'
  }
});

const OpeningAnimation = keyframes`
  0% {
    background-color: red;
  }
  100% {
    background-color: blue;
  }
`;

const ResponsiveMenuBox = styled.div<{ isOpen?: boolean }>((props) => {
  return props.isOpen
    ? {
        display: 'flex',
        '@media screen and (max-width: 768px)': {
          padding: '10px',
          position: 'fixed',
          top: '5rem',
          right: '0',
          zIndex: 9999,
          backgroundColor: '#eee',
          borderRadius: '12px',
          boxShadow: '0 8px 4px -4px rgba(38, 38, 38, .4)',
          animation: `1s ${OpeningAnimation.getName()} .1s ease-out infinite`
        }
      }
    : {
        display: 'flex',
        '@media screen and (max-width: 768px)': {
          display: 'none'
        }
      };
});

interface Props {
  name: string;
  theme: ThemeMode;
}

export function Header(props: Props) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return window.removeEventListener('resize', handleResize);
  }, []);

  function onMobileMenuButtonClick() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <StyledHeader themeMode={props.theme}>
      <Container>
        <Link href='/' passHref>
          <BlogName>{props.name}</BlogName>
        </Link>
        <Flex>
          <ResponsiveMenuBox isOpen={isMobileMenuOpen && windowWidth <= 768}>
            <ModeSwitch />
            <SearchForm method='GET' action='/search'>
              <InputBox type='text' placeholder='Search' id='search' minLength={2} maxLength={10} styles={{ width: '180px' }} />
              <SearchButton type='submit'>
                <i className='fas fa-search'></i>
              </SearchButton>
            </SearchForm>
          </ResponsiveMenuBox>
          <AdminMenuButton />
          <MobileMenuButton onClick={() => onMobileMenuButtonClick()}>
            <i className='fas fa-bars'></i>
          </MobileMenuButton>
        </Flex>
      </Container>
    </StyledHeader>
  );
}
