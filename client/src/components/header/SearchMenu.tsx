import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { theme } from 'src/styles';
import { InputBox, FocusWrapper, useWidth } from 'src/components';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { LangCode, changeLang, getCurrentLangCode, trans, Lang } from 'src/resources/languages';

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

interface Props {}

export function SearchMenu(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const router = useRouter();
  const [searchKeyword, setSearchKeyWord] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchKeyword.length < 2) {
      alert('2글자 이상 입력해주세요');
      return;
    }

    router.push({ pathname: '/search', query: { word: searchKeyword } });
  }

  return (
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
  );
}
