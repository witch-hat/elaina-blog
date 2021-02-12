import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import { theme } from 'src/styles';
import { InputBox, FocusWrapper, useWidth } from 'src/components';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
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

const SearchButton = styled.button<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '45px',
  height: '45px',
  marginLeft: '5px',
  fontSize: '1.2rem',
  borderRadius: '50%',
  backgroundColor: theme[props.themeMode].headerBackground,
  border: 'none',
  cursor: 'pointer',
  '&:focus': {
    outline: 'none'
  },
  '&:hover': {
    backgroundColor: theme[props.themeMode].hoverBackground
  },
  '@media screen and (max-width: 767px)': {
    width: '32px',
    height: '32px',
    backgroundColor: theme[props.themeMode].secondaryContentBackground
  }
}));

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

const ResponsiveMenuBox = styled.div<{ themeMode: ThemeMode }>(
  (props) => ({
    display: 'flex',
    '@media screen and (max-width: 767px)': {
      padding: '10px',
      position: 'fixed',
      right: '0',
      zIndex: 9999,
      backgroundColor: theme[props.themeMode].secondaryContentBackground,
      borderRadius: '12px',
      boxShadow: `0 8px 4px -4px ${theme[props.themeMode].shadowColor}`
    }
  }),
  css`
    @media screen and (max-width: 767px) {
      animation: 0.3s ${OpeningAnimation} forwards;
    }
  `
);

interface Props {
  isLogin: boolean;
  name: string;
}

export function Header(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const width = useWidth();
  const router = useRouter();
  const [progress, setProgress] = useState<number>(0);
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(width > 767);

  useEffect(() => {
    const setProgressStart = () => {
      setProgress(20);
    };

    const setProgressEnd = () => {
      setProgress(100);
    };

    router.events.on('routeChangeStart', setProgressStart);
    router.events.on('routeChangeComplete', setProgressEnd);
    router.events.on('routeChangeError', setProgressEnd);

    return () => {
      router.events.off('routeChangeStart', setProgressStart);
      router.events.off('routeChangeComplete', setProgressEnd);
      router.events.off('routeChangeError', setProgressEnd);
    };
  }, []);

  useEffect(() => {
    setIsMenuVisible(width > 767);
  }, [width]);

  function onMobileMenuButtonClick() {
    setIsMenuVisible(!isMenuVisible);
  }

  return (
    <StyledHeader themeMode={themeMode}>
      <LoadingBar color={theme[themeMode].themeColor} progress={progress} waitingTime={300} transitionTime={150} shadow={false} />
      <Container>
        <Link href='/' passHref>
          <BlogName themeMode={themeMode}>{props.name}</BlogName>
        </Link>
        <Flex>
          <FocusWrapper
            visible={isMenuVisible}
            onClickOutside={() => {
              if (width <= 767) setIsMenuVisible(false);
            }}
          >
            <>
              {isMenuVisible && (
                <ResponsiveMenuBox themeMode={themeMode}>
                  <ModeSwitch />
                  <SearchForm method='GET' action='/search'>
                    <InputBox
                      type='text'
                      placeholder='Search'
                      id='search'
                      minLength={2}
                      maxLength={10}
                      styles={{ width: '180px', small: { width: '120px', height: '32px' } }}
                    />
                    <SearchButton type='submit' themeMode={themeMode}>
                      <i className='fas fa-search'></i>
                    </SearchButton>
                  </SearchForm>
                </ResponsiveMenuBox>
              )}
            </>
          </FocusWrapper>
          <AdminMenuButton isLogin={props.isLogin} />
          <MobileMenuButton onClick={() => onMobileMenuButtonClick()}>
            <i className='fas fa-bars'></i>
          </MobileMenuButton>
        </Flex>
      </Container>
    </StyledHeader>
  );
}
