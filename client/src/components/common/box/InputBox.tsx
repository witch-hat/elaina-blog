import styled from 'styled-components';

interface Styles {
  width?: string;
  height?: string;
  fontSize?: string;
  small?: {
    width?: string;
    height?: string;
  };
}

const Input = styled.input<Styles>((props) => {
  return {
    width: props.width || '100px',
    height: props.height || '40px',
    fontSize: props.fontSize || '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    '&:focus': {
      outline: 'none'
    },
    '&:invalid': {
      border: '2px solid #ff0000'
    },
    '@media screen and (max-width: 768px)': {
      width: props.small?.width || '100px',
      height: props.small?.height || '40px'
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
      {...props.styles}
    />
  );
}
