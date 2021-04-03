import styled from 'styled-components';

const StyledFooter = styled.footer({
  width: '100%',
  height: '3rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderTop: '1px solid #ddd'
});

export function Footer() {
  return (
    <StyledFooter>
      <span>This is Footer</span>
    </StyledFooter>
  );
}
