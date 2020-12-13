import styled from 'styled-components';

const StyledFooter = styled.footer({
  width: '100vw',
  height: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

export function Footer() {
  return (
    <StyledFooter>
      <span>This is Footer</span>
    </StyledFooter>
  );
}
