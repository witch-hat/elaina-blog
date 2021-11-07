import styled from 'styled-components';
import Link from 'next/link';

const Button = styled.a((props) => ({
  display: 'flex',
  width: '2.5rem',
  height: '2.5rem',
  marginLeft: '5px',
  border: 'none',
  borderRadius: '50%',
  backgroundColor: props.theme.headerBackground,
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.2rem',
  cursor: 'pointer',
  '&:focus': {
    outline: 'none'
  },
  '&:hover': {
    backgroundColor: props.theme.hoverBackground
  },
  '@media screen and (max-width: 767px)': {
    width: '32px',
    height: '32px',
    backgroundColor: props.theme.secondaryContentBackground
  }
}));

interface Props {
  children: JSX.Element | JSX.Element[];
  href: string;
  width?: string;
  height?: string;
  shallow?: boolean;
}

export function CircleRippleA(props: Props) {
  return (
    <Link href={props.href} passHref shallow={props.shallow}>
      <Button>{props.children}</Button>
    </Link>
  );
}
