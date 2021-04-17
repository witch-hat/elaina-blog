import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { FocusWrapper } from 'src/components';
import { ThemeMode } from 'src/redux/common/type';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';

const MenuContainer = styled.div({
  position: 'relative'
});

const MenuListWrapper = styled.div({
  minWidth: '100%',
  position: 'absolute',
  top: '.5rem',
  right: '0',
  zIndex: 1
});

const MenuList = styled.div({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#eee',
  borderRadius: '.5rem'
});

const MainButton = styled.div({
  padding: '.5rem .8rem',
  cursor: 'pointer',
  borderRadius: '.5rem',
  '&:hover': {
    backgroundColor: '#eee'
  }
});

interface Props {
  visible: boolean;
  mainButton: JSX.Element;
  dropMenu: JSX.Element;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DropDownMenu(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <MenuContainer>
      <MainButton onClick={() => props.setVisible(!props.visible)}>{props.mainButton}</MainButton>
      <FocusWrapper visible={props.visible} onClickOutside={() => props.setVisible(false)}>
        <MenuListWrapper>
          <MenuList>{props.dropMenu}</MenuList>
        </MenuListWrapper>
      </FocusWrapper>
    </MenuContainer>
  );
}
