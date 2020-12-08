import styled from 'styled-components';

import { color } from 'resources/colors';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '.9rem',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap'
});

const Content = styled.div({
  display: 'flex',
  border: '1px solid #ddd',
  width: '100%',
  padding: '1rem',
  height: '8rem',
  margin: '.8rem',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: '.2s all',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 10px 4px -2px rgba(38, 38, 38, .2)'
  }
});

interface Props {}

export function ContentCategory() {
  return (
    <Container>
      <Content>Content1(미리보기: 사진, 제목, 내용)</Content>
      <Content>Content2(미리보기: 사진, 제목, 내용)</Content>
      <Content>Content3(미리보기: 사진, 제목, 내용)</Content>
      <Content>Content4(미리보기: 사진, 제목, 내용)</Content>
      <Content>Content5(미리보기: 사진, 제목, 내용)</Content>
    </Container>
  );
}
