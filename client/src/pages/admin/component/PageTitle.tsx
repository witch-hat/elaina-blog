import React from 'react';
import styled from 'styled-components';

const Title = styled.title({
  display: 'block',
  fontSize: '1.5rem',
  fontWeight: 'bold'
});

const StyledHr = styled.hr({
  width: '100%',
  margin: '1rem 0',
  border: 'none',
  borderBottom: '1px solid #666'
});

interface Props {
  title: string;
}

export function PageTitle(props: Props) {
  return (
    <>
      <Title>{props.title}</Title>
      <StyledHr />
    </>
  );
}
