import React from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div({
  display: 'block',
  width: '100%',
  '@media screen and (max-width: 1380px)': {
    display: 'flex',
    alignItems: 'center'
  }
});

const MenuButton = styled.button({
  display: 'none',
  padding: '.5rem',
  borderRadius: '.5rem',
  '@media screen and (max-width: 1380px)': {
    display: 'block'
  }
});

const Title = styled.p({
  display: 'block',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  '@media screen and (max-width: 1380px)': {
    width: '100%',
    paddingRight: '1rem',
    textAlign: 'right'
  }
});

const StyledHr = styled.hr({
  width: '100%',
  margin: '1rem 0',
  border: 'none',
  borderBottom: '1px solid #666'
});

interface Props {
  title: string;
  onMenuButtonClick: () => void;
}

export function PageHeader(props: Props) {
  return (
    <>
      <FlexContainer>
        <MenuButton onClick={props.onMenuButtonClick}>Menu</MenuButton>
        <Title>{props.title}</Title>
      </FlexContainer>
      <StyledHr />
    </>
  );
}
