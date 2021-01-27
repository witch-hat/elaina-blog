import React from 'react';
import styled from 'styled-components';

import { theme } from 'src/styles';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

interface Styles {
  width?: string;
  height?: string;
  fontSize?: string;
  margin?: string;
  small?: {
    width?: string;
    height?: string;
  };
}

interface InputProps {
  styles?: Styles;
  themeMode: ThemeMode;
}

const Input = styled.input<InputProps>((props) => {
  return {
    width: props.styles?.width || '100px',
    height: props.styles?.height || '40px',
    fontSize: props.styles?.fontSize || '1rem',
    margin: props.styles?.margin,
    border: `1px solid ${theme[props.themeMode].inputBorder}`,
    borderRadius: '8px',
    color: theme[props.themeMode].inputText,
    backgroundColor: theme[props.themeMode].inputBackground,
    '&:focus': {
      outline: 'none',
      padding: '1px',
      borderWidth: '2px',
      borderColor: theme[props.themeMode].focusBorder
    },
    '&::placeholder': {
      color: theme[props.themeMode].placeholderText
    },
    '@media screen and (max-width: 767px)': {
      width: props.styles?.small?.width || '100px',
      height: props.styles?.small?.height || '40px'
    }
  };
});

interface Props {
  id: string;
  type: string;
  minLength: number;
  maxLength: number;
  onFocus?: Function;
  onBlur?: Function;
  placeholder?: string;
  styles?: Styles;
}

export const InputBox = React.forwardRef<HTMLInputElement, Props>((props, forwardedRef) => {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Input
      ref={forwardedRef}
      id={props.id}
      placeholder={props.placeholder}
      type={props.type}
      minLength={props.minLength}
      maxLength={props.maxLength}
      autoComplete='off'
      styles={props.styles}
      themeMode={themeMode}
      onFocus={() => {
        if (props.onFocus) {
          props.onFocus();
        }
      }}
      onBlur={() => {
        if (props.onBlur) {
          props.onBlur();
        }
      }}
    />
  );
});
