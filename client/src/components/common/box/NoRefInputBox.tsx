import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
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
  themeMode: ThemeMode;
  isValid?: boolean;
  styles?: Styles;
}

const Input = styled.input<InputProps>((props) => {
  return {
    width: props.styles?.width || '100px',
    height: props.styles?.height || '40px',
    margin: props.styles?.margin,
    border: `1px solid ${theme[props.themeMode].inputBorder}`,
    borderRadius: '.5rem',
    backgroundColor: theme[props.themeMode].inputBackground,
    fontSize: props.styles?.fontSize || '1rem',
    color: theme[props.themeMode].inputText,
    '&:focus': {
      padding: '1px',
      borderWidth: '2px',
      borderColor: props.isValid ? theme[props.themeMode].inputOutline : theme[props.themeMode].invalidBorder,
      outline: 'none'
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
  type: string;
  minLength: number;
  maxLength: number;
  value: string;
  id?: string;
  onFocus?: Function;
  onBlur?: Function;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  styles?: Styles;
  isValid?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function NoRefInputBox(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Input
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
      onKeyDown={props.onKeyDown}
      onChange={props.onChange}
      isValid={props.isValid}
      formNoValidate
    />
  );
}

NoRefInputBox.defaultProps = {
  isValid: true
};
