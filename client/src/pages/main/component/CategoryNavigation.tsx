import styled from 'styled-components';

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
  transition: '.2s all',
  '&:hover': {
    boxShadow: 'inset 0 -2px 0 #999'
  }
});

const NavName = styled.span({
  fontWeight: 'bold'
});

export default function CategoryNavigation() {
  return (
    <Container>
      <NavButtons>
        <i className='fas fa-book'></i>&nbsp;
        <NavName>게시글</NavName>
      </NavButtons>
      <NavButtons>
        <i className='fas fa-user'></i>&nbsp;
        <NavName>About</NavName>
      </NavButtons>
    </Container>
  );
}
