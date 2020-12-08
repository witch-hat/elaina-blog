import styled from 'styled-components';

import { color } from 'resources/colors';

const Title = styled.div({
  width: '100%',
  fontSize: '22px',
  fontWeight: 'bold'
});

const Container = styled.div({
  width: '100%',
  height: '150px',
  padding: '.9rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '5px'
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '8px',
    backgroundColor: '#c1c2c3'
  }
});

const CategoryBox = styled.div({
  display: 'flex',
  flexDirection: 'column',
  border: `1px solid ${color.borderColor}`,
  borderRadius: '12px',
  padding: '.5rem',
  width: '8rem',
  height: '100%',
  margin: '0 15px',
  flexShrink: 0,
  cursor: 'pointer',
  transition: '.2s all',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 10px 4px -2px rgba(38, 38, 38, .2)'
  }
});

export function Category() {
  return (
    <>
      <Title>Category</Title>
      <Container>
        <CategoryBox>Category</CategoryBox>
        <CategoryBox>Category</CategoryBox>
        <CategoryBox>Category</CategoryBox>
        <CategoryBox>Category</CategoryBox>
        <CategoryBox>Category</CategoryBox>
        <CategoryBox>Category</CategoryBox>
        <CategoryBox>Category</CategoryBox>
        <CategoryBox>Category</CategoryBox>
        <CategoryBox>Category</CategoryBox>
        <CategoryBox>Category</CategoryBox>
      </Container>
    </>
  );
}
