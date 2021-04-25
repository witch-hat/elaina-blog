import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faLanguage } from '@fortawesome/free-solid-svg-icons';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { commonDispatch } from 'src/redux/common/dispatch';
import { LangCode, changeLang, getCurrentLangCode, trans, Lang } from 'src/resources/languages';

import { DropDownMenu } from '../common/box/DropDownMenu';

const RotateIcon = styled.span<{ isOpen: boolean }>((props) => {
  return {
    display: 'inline-block',
    marginLeft: '.4rem',
    transition: '.3s all',
    transform: props.isOpen ? 'rotate(180deg)' : 'none'
  };
});

const LanguageDropDown = styled.div({
  margin: '0 .5rem'
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

export function LanguageMenu() {
  const languages = {
    [LangCode.ko]: '한국어',
    [LangCode.en]: 'English'
  };
  const currentLangCode = getCurrentLangCode();
  const lang: LangCode = useSelector<RootState, any>((state) => state.common.lang);

  const [isLangMenuVisible, setIsLangMenuVisible] = useState(false);

  return (
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
  );
}
