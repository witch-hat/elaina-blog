import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { ThemeMode } from 'src/redux/common/type';
import { commonDispatch } from 'src/redux/common/dispatch';
import { RootState } from 'src/redux/rootReducer';

const Container = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '20px'
});

const Icon = styled.div<{ left?: boolean }>((props) => ({
  fontSize: '1.5rem',
  marginRight: props.left ? '5px' : '0',
  marginLeft: props.left ? '0' : '5px'
}));

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

interface SwitchIconProps {
  icon: IconProp;
  left?: boolean;
}

function ModeSwitchIcon(props: SwitchIconProps) {
  return props.left ? (
    <FontAwesomeIcon icon={props.icon} style={{ marginRight: '8px', fontSize: '1.25rem' }} />
  ) : (
    <FontAwesomeIcon icon={props.icon} style={{ marginLeft: '8px', fontSize: '1.25rem' }} />
  );
}

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
      {!isChecked && <ModeSwitchIcon left icon={faSun} />}
      <Switch isChecked={isChecked} onClick={() => setIsChecked(!isChecked)}></Switch>
      {isChecked && <ModeSwitchIcon icon={faMoon} />}
    </Container>
  );
}
