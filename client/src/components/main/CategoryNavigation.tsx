import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import NavigationButton from './NavigationButton';

const Container = styled.nav({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
});

const NavName = styled.span({
  fontWeight: 'bold'
});

interface Props {
  theme: string;
}

export default function CategoryNavigation(props: Props) {
  return (
    <Container>
      <NavigationButton href='/' theme={props.theme}>
        <>
          <i className='fas fa-book'></i>&nbsp;
          <NavName>게시글</NavName>
        </>
      </NavigationButton>
      <NavigationButton href='/about' theme={props.theme}>
        <>
          <i className='fas fa-user'></i>&nbsp;
          <NavName>About</NavName>
        </>
      </NavigationButton>
    </Container>
  );
}
