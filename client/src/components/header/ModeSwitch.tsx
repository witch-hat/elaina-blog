import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { ThemeMode } from 'src/redux/common/type';
import { commonDispatch } from 'src/redux/common/dispatch';
import { RootState } from 'src/redux/rootReducer';

const Container = styled.div({
  display: 'flex',
  marginRight: '20px',
  alignItems: 'center',
  justifyContent: 'center'
});

const Switch = styled.div<{ isChecked: boolean }>(
  (props) => ({
    position: 'relative',
    width: '45px',
    height: '20px',
    borderRadius: '34px',
    backgroundColor: props.isChecked ? '#555657' : '#ccc',
    cursor: 'pointer',
    transition: '0.4s'
  }),
  css<{ isChecked: boolean }>`
    &:before {
      position: absolute;
      left: 4px;
      bottom: 4px;
      height: 12px;
      width: 12px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.4s;
      transform: ${(props) => (props.isChecked ? 'translateX(26px)' : 'none')};
      content: '';
    }
  `
);

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

interface Props {
  changeThemeMode: (value: string) => void;
}

export function ModeSwitch(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [isChecked, setIsChecked] = useState(themeMode === ThemeMode.light ? false : true);

  useEffect(() => {
    if (isChecked) {
      commonDispatch.SetThemeMode(ThemeMode.dark);
      window.localStorage.setItem('mode', ThemeMode.dark);
      props.changeThemeMode(ThemeMode.dark);
    } else {
      commonDispatch.SetThemeMode(ThemeMode.light);
      window.localStorage.setItem('mode', ThemeMode.light);
      props.changeThemeMode(ThemeMode.light);
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
