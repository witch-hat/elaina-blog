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

export default function CategoryNavigation() {
  return (
    <Container>
      <NavigationButton href='/'>
        <>
          <i className='fas fa-book'></i>&nbsp;
          <NavName>게시글</NavName>
        </>
      </NavigationButton>
      <NavigationButton href='/about'>
        <>
          <i className='fas fa-user'></i>&nbsp;
          <NavName>About</NavName>
        </>
      </NavigationButton>
    </Container>
  );
}