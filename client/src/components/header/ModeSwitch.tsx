import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { ThemeMode } from 'src/redux/common/type';
import { commonDispatch } from 'src/redux/common/dispatch';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '20px'
});

const Icon = styled.div({
  fontSize: '1.5rem',
  marginRight: '5px'
});

const Switch = styled.div<{ isChecked: boolean }>`
  position: relative;
  cursor: pointer;
  width: 45px;
  height: 20px;
  background-color: ${(props) => (props.isChecked ? '#555657' : '#ccc')};
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    position: absolute;
    content: '';
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    transition: 0.4s;
    border-radius: 50%;
    transform: ${(props) => (props.isChecked ? 'translateX(26px)' : 'none')};
  }
`;

export function ModeSwitch() {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [isChecked, setIsChecked] = useState(themeMode === ThemeMode.light ? false : true);

  useEffect(() => {
    if (isChecked) {
      commonDispatch.SetThemeMode(ThemeMode.dark);
    } else {
      commonDispatch.SetThemeMode(ThemeMode.light);
    }
  }, [isChecked]);

  return (
    <Container>
      <Icon>{isChecked ? <i className='fas fa-moon'></i> : <i className='fas fa-sun'></i>}</Icon>
      <Switch isChecked={isChecked} onClick={() => setIsChecked(!isChecked)}></Switch>
    </Container>
  );
}
