import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

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
  href?: string;
  query?: string;
  children: JSX.Element;
}

export function NavigationButton(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const router = useRouter();

  return (
    <Link href={props.href ? props.href : { query: { tab: props.query } }}>
      <NavButtons isSelected={router.query['tab'] === props.query} themeMode={themeMode}>
        {props.children}
      </NavButtons>
    </Link>
  );
}
