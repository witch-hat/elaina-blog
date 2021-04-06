import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { theme } from 'src/styles';
import { ModalWrapper, BorderBox } from 'src/components';

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

const Input = styled.input<{ themeMode: ThemeMode }>((props) => ({
  display: 'inline-block',
  width: '100%',
  height: '2rem',
  fontSize: '1.1rem',
  padding: '.2rem',
  outline: 'none',
  fontWeight: 'normal',
  border: `1px solid ${theme[props.themeMode].inputBorder}`,
  borderRadius: '8px',
  color: theme[props.themeMode].inputText,
  backgroundColor: theme[props.themeMode].inputBackground
}));

const ModalContainer = styled.div<{ width: string }>((props) => ({
  width: props.width,
  padding: '.5rem'
}));

const ModalParagraph = styled.p({
  width: '100%'
});

const ModalButtonContainer = styled.div({
  display: 'flex',
  width: '100%',
  marginTop: '1rem',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

const ModalButton = styled.button<{ themeMode?: ThemeMode }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  borderRadius: '.5rem',
  marginLeft: '.5rem',
  backgroundColor: props.themeMode ? theme[props.themeMode].dangerButtonColor : 'inherit',
  color: props.themeMode ? theme[props.themeMode].dangerContentText : 'inherit'
}));

const SelectedImage = styled.div({
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

interface Props {
  isAddModalOpen: boolean;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AddCategoryModal(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  async function addNewCategory() {}

  return (
    <ModalWrapper visible={props.isAddModalOpen}>
      <ModalContainer width='720px'>
        <ModalParagraph>{'새 카테고리를 만듭니다.'}</ModalParagraph>
        <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
          <Content>
            <PreviewTextWrapper>
              <Input type='text' themeMode={themeMode} placeholder='Title' />
              <Input type='text' themeMode={themeMode} placeholder='Description' />
            </PreviewTextWrapper>
            <SelectedImage>
              <label htmlFor='category-image-select'>
                <FontAwesomeIcon icon={faCamera} /> Choose
              </label>
              <span hidden>
                <Input id='category-image-select' type='file' themeMode={themeMode} accept='image/x-png,image/jpeg' />
              </span>
            </SelectedImage>
          </Content>
        </BorderBox>
        <ModalButtonContainer>
          <ModalButton
            onClick={() => {
              props.setIsAddModalOpen(false);
              addNewCategory();
            }}
            themeMode={themeMode}
          >
            저장
          </ModalButton>
          <ModalButton onClick={() => props.setIsAddModalOpen(false)}>취소</ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalWrapper>
  );
}
