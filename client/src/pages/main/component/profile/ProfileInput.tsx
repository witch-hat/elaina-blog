import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Input = styled.input<{ themeMode: ThemeMode }>((props) => ({
  display: 'inline-block',
  width: '100%',
  height: '2rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${theme[props.themeMode].inputBorder}`,
  borderRadius: '.5rem',
  backgroundColor: theme[props.themeMode].inputBackground,
  fontSize: '1.0rem',
  fontWeight: 'normal',
  color: theme[props.themeMode].inputText
}));

interface Props {
  placeholder: string;
  defaultValue: string;
  changeEditingProfile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileInput(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Input
      placeholder={props.placeholder}
      themeMode={themeMode}
      type='text'
      defaultValue={props.defaultValue}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => props.changeEditingProfile(event)}
    />
  );
}
