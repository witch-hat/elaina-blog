import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styled, { keyframes, css } from 'styled-components';

import { ThemeMode } from 'src/redux/common/type';
import { theme } from 'src/styles';
import { InputBox, FocusWrapper, useWidth } from 'src/components';
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
    backgroundColor: theme[props.themeMode].headerBackground
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
  '@media screen and (max-width: 1380px)': {
    padding: '0 10px'
  },
  '@media screen and (max-width: 767px)': {
    padding: '0'
  }
});

const BlogName = styled.div<{ themeMode: ThemeMode }>((props) => ({
  fontSize: '1.8rem',
  padding: '10px',
  cursor: 'pointer',
  color: theme[props.themeMode].blogName
}));

const SearchButton = styled.button({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '45px',
  height: '45px',
  marginLeft: '5px',
  fontSize: '1.2rem',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  '&:focus': {
    outline: 'none'
  },
  '&:hover': {
    backgroundColor: '#eee'
  },
  '@media screen and (max-width: 767px)': {
    width: '32px',
    height: '32px'
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
  padding: '10px',
  fontSize: '1.5rem',
  '@media screen and (max-width: 767px)': {
    display: 'block'
  }
});

const OpeningAnimation = keyframes({
  from: {
    opacity: 0,
    top: '4rem'
  },
  to: {
    opacity: 1,
    top: '5rem'
  }
});

const ResponsiveMenuBox = styled.div<{ isOpen?: boolean }>((props) => {
  return props.isOpen
    ? css`
        display: flex;
        @media screen and (max-width: 767px) {
          padding: 10px;
          position: fixed;
          right: 0;
          z-index: 9999;
          background-color: #eee;
          border-radius: 12px;
          box-shadow: 0 8px 4px -4px rgba(38, 38, 38, 0.4);
          animation: 0.3s ${OpeningAnimation} forwards;
        }
      `
    : {
        display: 'flex',
        '@media screen and (max-width: 767px)': {
          display: 'none'
        }
      };
});

interface Props {
  name: string;
  theme: ThemeMode;
}

export function Header(props: Props) {
  const [isMenuVisible, setIsMenuVisible] = useState(window.innerWidth > 767);
  const width = useWidth();

  useEffect(() => {
    setIsMenuVisible(width > 767);
  }, [width]);

  function onMobileMenuButtonClick() {
    setIsMenuVisible(!isMenuVisible);
  }

  return (
    <StyledHeader themeMode={props.theme}>
      <Container>
        <Link href='/' passHref>
          <BlogName themeMode={props.theme}>{props.name}</BlogName>
        </Link>
        <Flex>
          <FocusWrapper
            visible={isMenuVisible}
            onClickOutside={() => {
              if (width <= 767) setIsMenuVisible(false);
            }}
          >
            <ResponsiveMenuBox isOpen={isMenuVisible}>
              <ModeSwitch />
              <SearchForm method='GET' action='/search'>
                <InputBox
                  type='text'
                  placeholder='Search'
                  id='search'
                  minLength={2}
                  maxLength={10}
                  styles={{ width: '180px', small: { width: '120px', height: '32px' } }}
                  theme={props.theme}
                />
                <SearchButton type='submit'>
                  <i className='fas fa-search'></i>
                </SearchButton>
              </SearchForm>
            </ResponsiveMenuBox>
          </FocusWrapper>
          <AdminMenuButton />
          <MobileMenuButton onClick={() => onMobileMenuButtonClick()}>
            <i className='fas fa-bars'></i>
          </MobileMenuButton>
        </Flex>
      </Container>
    </StyledHeader>
  );
}
