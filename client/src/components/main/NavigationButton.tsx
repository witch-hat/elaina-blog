import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import { theme } from 'src/styles';

interface ButtonProps {
  isSelected: boolean;
  themeMode: string;
}

const NavButtons = styled.a<ButtonProps>((props) => {
  return {
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem 1rem',
    fontSize: '1.25rem',
    cursor: 'pointer',
    transition: '.2s all',
    userSelect: 'none',
    boxShadow: props.isSelected ? `inset 0 -3px 0 ${theme[props.themeMode].navUnderBar}` : 'none',
    '&:hover': {
      boxShadow: props.isSelected
        ? `inset 0 -3px 0 ${theme[props.themeMode].navUnderBar}`
        : `inset 0 -3px 0 ${theme[props.themeMode].navHoverUnderBar}`
    }
  };
});

interface Props {
  href: string;
  children: JSX.Element;
  theme: string;
}

export default function NavigationButton(props: Props) {
  const router = useRouter();

  return (
    <Link href={props.href}>
      <NavButtons isSelected={router.pathname === props.href} themeMode={props.theme}>
        {props.children}
      </NavButtons>
    </Link>
  );
}
