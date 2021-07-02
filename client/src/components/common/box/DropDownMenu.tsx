import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { FocusWrapper } from 'src/components';
import { ThemeMode } from 'src/redux/common/type';
// import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';

const MenuContainer = styled.div({
  position: 'relative'
});

const MenuListWrapper = styled.div({
  position: 'absolute',
  top: '.5rem',
  right: '0',
  minWidth: '100%',
  zIndex: 1
});

const MenuList = styled.div((props) => ({
  display: 'flex',
  backgroundColor: props.theme.secondaryContentBackground,
  borderRadius: '.5rem',
  flexDirection: 'column'
}));

const MainButton = styled.div((props) => ({
  padding: '.5rem .8rem',
  borderRadius: '.5rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: props.theme.hoverBackground
  },
  '@media screen and (max-width: 767px)': {
    padding: '.5rem'
  }
}));

interface Props {
  visible: boolean;
  mainButton: JSX.Element;
  dropMenu: JSX.Element;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DropDownMenu(props: Props) {
  // const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

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
