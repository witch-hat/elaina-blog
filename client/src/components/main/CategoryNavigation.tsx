import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from 'styled-components';

import NavigationButton from './NavigationButton';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.nav({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
});

const NavName = styled.span({
  fontWeight: 'bold'
});

interface Props {}

export default function CategoryNavigation(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Container>
      <NavigationButton href='/'>
        <>
          <i className='fas fa-book'></i>&nbsp;
          <NavName>게시글</NavName>
        </>
      </NavigationButton>
      <NavigationButton href='/timeline'>
        <>
          <i className='fas fa-stream'></i>&nbsp;
          <NavName>TimeLine</NavName>
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
