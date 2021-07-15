import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { FocusWrapper } from 'src/components';

const MenuContainer = styled.div({
  position: 'relative',
  userSelect: 'none'
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

const MainButton = styled.div<{ visible: boolean }>((props) => ({
  padding: '.5rem .8rem',
  borderRadius: '.5rem',
  backgroundColor: props.visible ? props.theme.selectedButton : 'inherit',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: props.theme.hoverBackground
  },
  '@media screen and (max-width: 767px)': {
    padding: '.5rem'
  }
}));

interface Props {
  mainButton: JSX.Element;
  dropMenu: JSX.Element;
}

export function DropDownMenu(props: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const onClickMainButton = useCallback(() => setIsVisible((prev) => !prev), []);

  const onClickOutside = useCallback(() => setIsVisible(false), []);

  return (
    <MenuContainer>
      <MainButton onClick={onClickMainButton} visible={isVisible}>
        {props.mainButton}
      </MainButton>
      <FocusWrapper visible={isVisible} onClickOutside={onClickOutside}>
        <MenuListWrapper>
          <MenuList onClick={() => setIsVisible(false)}>{props.dropMenu}</MenuList>
        </MenuListWrapper>
      </FocusWrapper>
    </MenuContainer>
  );
}
