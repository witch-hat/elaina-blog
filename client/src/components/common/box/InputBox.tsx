import styled from 'styled-components';

import { theme } from 'src/styles';
import { ThemeMode } from 'src/redux/common/type';

interface Styles {
  width?: string;
  height?: string;
  fontSize?: string;
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
    border: `1px solid ${theme[props.themeMode].inputBorder}`,
    borderRadius: '8px',
    backgroundColor: theme[props.themeMode].inputBackground,
    '&:focus': {
      outline: 'none'
    },
    '&:invalid': {
      border: '2px solid #ff0000'
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
  placeholder: string;
  styles?: Styles;
  theme: ThemeMode;
}

export function InputBox(props: Props) {
  return (
    <Input
      id={props.id}
      placeholder={props.placeholder}
      type={props.type}
      minLength={props.minLength}
      maxLength={props.maxLength}
      autoComplete='off'
      styles={props.styles}
      themeMode={props.theme}
    />
  );
}
