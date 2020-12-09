import styled from 'styled-components';

import { BorderBox } from 'components';
import { color } from 'resources/colors';

const Title = styled.div({
  width: '100%',
  fontSize: '22px',
  fontWeight: 'bold',
  margin: '25px 0 0'
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '.9rem',
  justifyContent: 'center',
  alignItems: 'center'
});

const Content = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'calc(950px - 1.8rem)',
  padding: '1rem',
  height: '10rem'
});

interface Props {}

export function ContentCategory() {
  return (
    <div style={{ width: '100%' }}>
      <Title>Content Category</Title>
      <Container>
        <BorderBox styles={{ margin: '.8rem 0' }}>
          <Content>Content1(미리보기: 사진, 제목, 내용)</Content>
        </BorderBox>
        <BorderBox styles={{ margin: '.8rem 0' }}>
          <Content>Content2(미리보기: 사진, 제목, 내용)</Content>
        </BorderBox>
        <BorderBox styles={{ margin: '.8rem 0' }}>
          <Content>Content3(미리보기: 사진, 제목, 내용)</Content>
        </BorderBox>
        <BorderBox styles={{ margin: '.8rem 0' }}>
          <Content>Content4(미리보기: 사진, 제목, 내용)</Content>
        </BorderBox>
        <BorderBox styles={{ margin: '.8rem 0' }}>
          <Content>Content5(미리보기: 사진, 제목, 내용)</Content>
        </BorderBox>
      </Container>
    </div>
  );
}
