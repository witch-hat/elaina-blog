import styled from 'styled-components';

import { BorderBox, HorizontalScrollWrapper } from 'src/components';

const Container = styled.nav({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
});

const NavButtons = styled.div({
  display: 'flex',
  alignItems: 'center',
  padding: '.5rem 1rem',
  fontSize: '1.25rem',
  cursor: 'pointer',
  '&:hover': {
    // textShadow: '0 0 4px #1f2f3f, 0 0 7px #1f2f3f, 0 0 10px #1f2f3f'
  }
});

const NavName = styled.span({
  fontWeight: 'bold'
});

export default function Navigation() {
  return (
    <Container>
      <NavButtons>
        <i className='fas fa-book'></i>&nbsp;
        <NavName>글 목록</NavName>
      </NavButtons>
      <NavButtons>
        <i className='fas fa-user'></i>&nbsp;
        <NavName>About</NavName>
      </NavButtons>
    </Container>
  );
}
