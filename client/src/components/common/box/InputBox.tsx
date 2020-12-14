import styled from 'styled-components';

interface Styles {
  width?: string;
  height?: string;
  fontSize?: string;
}

const Input = styled.input<Styles>((props) => {
  return {
    width: props.width || '100px',
    height: props.height || '40px',
    fontSize: props.fontSize || '16px',
    border: '2px solid #999',
    borderRadius: '8px',
    '&:focus': {
      outline: 'none'
    },
    '&:invalid': {
      border: '2px solid #ff0000'
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
      {...props.styles}
    />
  );
}
