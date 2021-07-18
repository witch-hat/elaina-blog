import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faLanguage } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'src/redux/rootReducer';
import { commonDispatch } from 'src/redux/common/dispatch';
import { LangCode, changeLang, getCurrentLangCode } from 'src/resources/languages';

import { DropDownMenu } from '../common/box/DropDownMenu';

const RotateIcon = styled.span({
  display: 'inline-block',
  marginLeft: '.4rem'
});

const LanguageDropDown = styled.div({
  margin: '0 .5rem',
  '@media screen and (max-width: 767px)': {
    margin: '0'
  }
});

const LanguageItem = styled.p((props) => ({
  width: '100%',
  padding: '.5rem',
  borderRadius: '.5rem',
  textAlign: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: props.theme.hoverBackground
  }
}));

interface Props {}

export function LanguageMenu(props: Props) {
  const languages = {
    [LangCode.ko]: '한국어',
    [LangCode.en]: 'English'
  };

  return (
    <LanguageDropDown>
      <DropDownMenu
        mainButton={
          <>
            <FontAwesomeIcon size={'lg'} icon={faLanguage} />
            <RotateIcon>
              <FontAwesomeIcon icon={faCaretDown} />
            </RotateIcon>
          </>
        }
        dropMenu={
          <>
            {Object.keys(languages).map((code: any) => {
              return (
                <LanguageItem
                  key={code}
                  onClick={() => {
                    changeLang(code as LangCode);
                    commonDispatch.SetLanguage(code);
                  }}
                  // themeMode={themeMode}
                >
                  {languages[code as LangCode]}
                </LanguageItem>
              );
            })}
          </>
        }
      />
    </LanguageDropDown>
  );
}

export const MemoizedLanguageMenu = React.memo(LanguageMenu);
