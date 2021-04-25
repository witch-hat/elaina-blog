import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import { theme } from 'src/styles';
import { FocusWrapper, useWidth } from 'src/components';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

import { ModeSwitch } from './ModeSwitch';
import { ProgressBar } from './ProgressBar';
import { SearchMenu } from './SearchMenu';
import { LanguageMenu } from './LanguageMenu';
import { AdminMenu } from './AdminMenu';

const StyledHeader = styled.header<{ themeMode: ThemeMode }>((props) => {
  return {
    display: 'flex',
    position: 'fixed',
    top: '0',
    width: '100%',
    height: '4rem',
    padding: '.5rem 0',
    borderBottom: '1px solid #ccc',
    backgroundColor: theme[props.themeMode].headerBackground,
    fontWeight: 'bold',
    alignItems: 'center',
    zIndex: 9999
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

const BlogName = styled.a<{ themeMode: ThemeMode }>((props) => ({
  padding: '10px',
  color: theme[props.themeMode].blogName,
  fontSize: '1.8rem',
  cursor: 'pointer'
}));

const Flex = styled.div({
  display: 'flex',
  width: 'max-content',
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
      position: 'fixed',
      right: '0',
      padding: '10px',
      borderRadius: '.5rem',
      backgroundColor: theme[props.themeMode].secondaryContentBackground,
      boxShadow: `0 8px 4px -4px ${theme[props.themeMode].shadowColor}`,
      zIndex: 9999
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
  const [isSwitchAndSearchVisible, setIsSwitchAndSearchVisible] = useState<boolean>(width > 767);

  useEffect(() => {
    setIsSwitchAndSearchVisible(width > 767);
  }, [width]);

  function onMobileMenuButtonClick() {
    setIsSwitchAndSearchVisible(!isSwitchAndSearchVisible);
  }

  return (
    <StyledHeader themeMode={themeMode}>
      <ProgressBar color={theme[themeMode].themeColor} />
      <Container>
        <Link href='/' passHref>
          <BlogName themeMode={themeMode}>{props.name}</BlogName>
        </Link>
        <Flex>
          <FocusWrapper
            visible={isSwitchAndSearchVisible}
            onClickOutside={() => {
              if (width <= 767) setIsSwitchAndSearchVisible(false);
            }}
          >
            <>
              {isSwitchAndSearchVisible && (
                <ResponsiveMenuBox themeMode={themeMode}>
                  <ModeSwitch />
                  <SearchMenu />
                </ResponsiveMenuBox>
              )}
            </>
          </FocusWrapper>
          <LanguageMenu />
          <AdminMenu isLogin={props.isLogin} />
          <MobileMenuButton onClick={() => onMobileMenuButtonClick()}>
            <FontAwesomeIcon icon={faBars} />
          </MobileMenuButton>
        </Flex>
      </Container>
    </StyledHeader>
  );
}
