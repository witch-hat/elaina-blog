import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faCaretDown, faLanguage } from '@fortawesome/free-solid-svg-icons';

import { theme } from 'src/styles';
import { InputBox, FocusWrapper, useWidth } from 'src/components';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { commonDispatch } from 'src/redux/common/dispatch';
import { LangCode, changeLang, getCurrentLangCode, trans, Lang } from 'src/resources/languages';

import { LOGOUT } from 'src/query/user';
import { ModeSwitch } from './ModeSwitch';
import { ProgressBar } from './ProgressBar';
import { DropDownMenu } from '../common/box/DropDownMenu';

const StyledHeader = styled.header<{ themeMode: ThemeMode }>((props) => {
  return {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    borderBottom: '1px solid #ccc',
    padding: '.5rem 0',
    fontWeight: 'bold',
    position: 'fixed',
    top: '0',
    zIndex: 9999,
    height: '4rem',
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

const BlogName = styled.a<{ themeMode: ThemeMode }>((props) => ({
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

const RotateIcon = styled.span<{ isOpen: boolean }>((props) => {
  return {
    display: 'inline-block',
    marginLeft: '.4rem',
    transition: '.3s all',
    transform: props.isOpen ? 'rotate(180deg)' : 'none'
  };
});

const LanguageItem = styled.p({
  width: '100%',
  padding: '.5rem',
  cursor: 'pointer',
  textAlign: 'center',
  borderRadius: '.5rem',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: '#eee'
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

const LanguageDropDown = styled.div({
  margin: '0 .5rem'
});

const AdminDropDown = styled.div({});

const MenuItem = styled.a<{ themeMode: ThemeMode }>((props) => {
  return {
    padding: '.5rem',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    wordBreak: 'keep-all',
    '&:hover': {
      backgroundColor: theme[props.themeMode].hoverBackground
    }
  };
});

interface Props {
  isLogin: boolean;
  name: string;
}

export function Header(props: Props) {
  const languages = {
    [LangCode.ko]: '한국어',
    [LangCode.en]: 'English'
  };
  const currentLangCode = getCurrentLangCode();
  const lang: LangCode = useSelector<RootState, any>((state) => state.common.lang);
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const width = useWidth();
  const router = useRouter();
  const [isAdminMenuVisible, setIsAdminMenuVisible] = useState<boolean>(width > 767);
  const [isLangMenuVisible, setIsLangMenuVisible] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [searchKeyword, setSearchKeyWord] = useState('');

  const [logout] = useMutation(LOGOUT, {
    onCompleted: () => {
      router.reload();
    }
  });

  useEffect(() => {
    setIsAdminMenuVisible(width > 767);
  }, [width]);

  function onMobileMenuButtonClick() {
    setIsAdminMenuVisible(!isAdminMenuVisible);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchKeyword.length < 2) {
      alert('2글자 이상 입력해주세요');
      return;
    }

    router.push({ pathname: '/search', query: { word: searchKeyword } });
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
            visible={isAdminMenuVisible}
            onClickOutside={() => {
              if (width <= 767) setIsAdminMenuVisible(false);
            }}
          >
            <>
              {isAdminMenuVisible && (
                <ResponsiveMenuBox themeMode={themeMode}>
                  <ModeSwitch />
                  <SearchForm onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                    <InputBox
                      type='text'
                      placeholder={trans(Lang.Search)}
                      id='search'
                      minLength={2}
                      maxLength={10}
                      styles={{ width: '180px', small: { width: '120px', height: '32px' } }}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyWord(e.currentTarget.value)}
                    />
                    <SearchButton type='submit' themeMode={themeMode}>
                      <FontAwesomeIcon icon={faSearch} />
                    </SearchButton>
                  </SearchForm>
                </ResponsiveMenuBox>
              )}
            </>
          </FocusWrapper>
          <LanguageDropDown>
            <DropDownMenu
              visible={isLangMenuVisible}
              mainButton={
                <>
                  <FontAwesomeIcon size={'lg'} icon={faLanguage} />
                  <RotateIcon isOpen={isLangMenuVisible}>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </RotateIcon>
                </>
              }
              setVisible={setIsLangMenuVisible}
              dropMenu={
                <>
                  {Object.keys(languages).map((code: any) => {
                    return (
                      <LanguageItem
                        key={code}
                        onClick={() => {
                          changeLang(code as LangCode);
                          commonDispatch.SetLanguage(code);
                          setIsLangMenuVisible(false);
                        }}
                      >
                        {languages[code as LangCode]}
                      </LanguageItem>
                    );
                  })}
                </>
              }
            />
          </LanguageDropDown>
          <AdminDropDown>
            <DropDownMenu
              visible={isAdminMenuOpen}
              mainButton={
                <>
                  {trans(Lang.Menu)}
                  <RotateIcon isOpen={isAdminMenuOpen}>
                    <FontAwesomeIcon icon={faCaretDown} />
                  </RotateIcon>
                </>
              }
              setVisible={setIsAdminMenuOpen}
              dropMenu={
                <>
                  <Link href='/admin'>
                    <MenuItem themeMode={themeMode} onClick={() => setIsAdminMenuOpen(false)}>
                      {trans(Lang.Admin)}
                    </MenuItem>
                  </Link>
                  {props.isLogin ? (
                    <MenuItem
                      themeMode={themeMode}
                      onClick={() => {
                        logout();
                      }}
                    >
                      {trans(Lang.Logout)}
                    </MenuItem>
                  ) : (
                    <Link href='/admin/login'>
                      <MenuItem themeMode={themeMode} onClick={() => setIsAdminMenuOpen(false)}>
                        {trans(Lang.Login)}
                      </MenuItem>
                    </Link>
                  )}
                </>
              }
            />
          </AdminDropDown>
          <MobileMenuButton onClick={() => onMobileMenuButtonClick()}>
            <FontAwesomeIcon icon={faBars} />
          </MobileMenuButton>
        </Flex>
      </Container>
    </StyledHeader>
  );
}
