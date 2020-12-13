import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

const NavButtons = styled.a<{ isSelected: boolean }>((props) => {
  return {
    display: 'flex',
    alignItems: 'center',
    padding: '.5rem 1rem',
    fontSize: '1.25rem',
    cursor: 'pointer',
    transition: '.2s all',
    boxShadow: props.isSelected ? 'inset 0 -3px 0 #555' : 'none',
    '&:hover': {
      boxShadow: props.isSelected ? 'inset 0 -3px 0 #555' : 'inset 0 -3px 0 #888'
    }
  };
});

interface Props {
  href: string;
  children: JSX.Element;
}

export default function NavigationButton(props: Props) {
  const router = useRouter();

  return (
    <Link href={props.href}>
      <NavButtons isSelected={router.pathname === props.href}>{props.children}</NavButtons>
    </Link>
  );
}
