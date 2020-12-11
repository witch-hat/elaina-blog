import styled from 'styled-components';

import { BorderBox, HorizontalScrollWrapper } from 'src/components';

const Title = styled.div({
  width: '100%',
  fontSize: '1.4rem',
  fontWeight: 'bold'
});

const Container = styled.div({
  width: '100%',
  height: '150px',
  padding: '1rem',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  overflowY: 'hidden',
  overflowX: 'auto',
  '&::-webkit-scrollbar': {
    width: '5px',
    height: '5px'
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: '8px',
    backgroundColor: '#c1c2c3'
  },
  '& > div:nth-child(1)': {
    margin: '0 10px 0 0 !important'
  }
});

const Content = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '.5rem',
  width: '7rem',
  height: '7rem'
});

export default function Category() {
  return (
    <div style={{ width: '100%' }}>
      <Title>Category</Title>
      <HorizontalScrollWrapper>
        <Container>
          <BorderBox isTransform={true} styles={{ margin: '0 10px' }}>
            <Content>Category</Content>
          </BorderBox>
          <BorderBox isTransform={true} styles={{ margin: '0 10px' }}>
            <Content>Category</Content>
          </BorderBox>
          <BorderBox isTransform={true} styles={{ margin: '0 10px' }}>
            <Content>Category</Content>
          </BorderBox>
          <BorderBox isTransform={true} styles={{ margin: '0 10px' }}>
            <Content>Category</Content>
          </BorderBox>
          <BorderBox isTransform={true} styles={{ margin: '0 10px' }}>
            <Content>Category</Content>
          </BorderBox>
          <BorderBox isTransform={true} styles={{ margin: '0 10px' }}>
            <Content>Category</Content>
          </BorderBox>
          <BorderBox isTransform={true} styles={{ margin: '0 10px' }}>
            <Content>Category</Content>
          </BorderBox>
          <BorderBox isTransform={true} styles={{ margin: '0 10px' }}>
            <Content>Category</Content>
          </BorderBox>
          <BorderBox isTransform={true} styles={{ margin: '0 10px' }}>
            <Content>Category</Content>
          </BorderBox>
          <BorderBox isTransform={true} styles={{ margin: '0 10px' }}>
            <Content>Category</Content>
          </BorderBox>
        </Container>
      </HorizontalScrollWrapper>
    </div>
  );
}
