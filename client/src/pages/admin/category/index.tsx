import React from 'react';
import styled from 'styled-components';

import { BorderBox } from 'src/components';
import { mockUpData } from 'src/resources';
import { AdminPageLayout } from '../component/AdminPageLayout';
import { theme } from 'src/styles';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const CategoryContainer = styled.div({
  width: '90%',
  display: 'flex',
  alignItems: 'center'
});

const Content = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '.8rem',
  height: '10rem'
});

const PreviewImage = styled.img({
  width: '260px',
  marginLeft: '1rem',
  height: '8.4rem',
  objectFit: 'cover',
  float: 'right',
  '@media screen and (max-width: 1380px)': {
    width: '32%',
    marginLeft: '3%'
  }
});

const PreviewTextWrapper = styled.div({
  width: '100%',
  display: 'flex',
  height: '8.4rem',
  flexDirection: 'column',
  alignItems: 'flex-start'
});

const PreviewTitle = styled.span({
  flexShrink: 0,
  height: '2rem',
  width: '100%',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  textAlign: 'left',
  wordBreak: 'keep-all',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '@media screen and (max-width: 1380px)': {
    wordBreak: 'break-all'
  }
});

const PreviewContent = styled.span({
  flexShrink: 0,
  width: '100%',
  height: '4.5rem',
  fontSize: '1.1rem',
  margin: '.25rem 0 0',
  wordBreak: 'keep-all',
  textAlign: 'left',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

const ButtonContainer = styled.div({
  marginLeft: '1rem',
  display: 'flex',
  height: 'max-content'
});

const Button = styled.button<{ danger?: boolean; themeMode: ThemeMode }>((props) => ({
  marginRight: '.5rem',
  fontSize: '.9rem',
  borderRadius: '4px',
  padding: '.5rem',
  height: 'max-content',
  backgroundColor: props.danger ? theme[props.themeMode].dangerButtonColor : theme[props.themeMode].buttonBackground,
  color: props.danger ? theme[props.themeMode].dangerContentText : 'inherit',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

export default function Category() {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <AdminPageLayout>
      <Container>
        {mockUpData.category.map((category) => {
          return (
            <CategoryContainer>
              <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
                <Content>
                  <PreviewTextWrapper>
                    <PreviewTitle>{category.name}</PreviewTitle>
                    <PreviewContent>{category.description}</PreviewContent>
                  </PreviewTextWrapper>
                  <PreviewImage src='/images/FakeProfile.png' alt='preview image' />
                </Content>
              </BorderBox>
              <ButtonContainer>
                <Button themeMode={themeMode}>Edit</Button>
                <Button themeMode={themeMode} danger>
                  Delete
                </Button>
              </ButtonContainer>
            </CategoryContainer>
          );
        })}
      </Container>
    </AdminPageLayout>
  );
}
