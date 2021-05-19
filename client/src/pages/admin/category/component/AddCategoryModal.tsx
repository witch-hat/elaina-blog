import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';

import { AlertStateType } from 'src/components';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { theme } from 'src/styles';
import { ModalWrapper, BorderBox } from 'src/components';
import { ADD_CATEGORY, CategoryDetails } from 'src/query/category';

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
  borderRadius: '.5rem',
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
  categories: CategoryDetails[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryDetails[]>>;
  initAlertState: AlertStateType;
  setAlertState: React.Dispatch<React.SetStateAction<AlertStateType>>;
}

export function AddCategoryModal(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  const [newCategory, setNewCategory] = useState<CategoryDetails | null>(null);

  const [addCategory] = useMutation(ADD_CATEGORY);

  useEffect(() => {
    newCategory && props.setCategories([...props.categories, newCategory]);
  }, [newCategory]);

  async function addNewCategory() {
    props.setAlertState(props.initAlertState);

    try {
      const response = await addCategory({
        variables: {
          title,
          description,
          previewImage
        }
      });

      setNewCategory({
        _id: response.data.addCategory._id,
        title,
        description,
        previewImage,
        postCount: 0,
        recentCreatedAt: new Date(),
        order: props.categories.length
      });

      props.setAlertState({
        msg: 'New category added successfully.',
        isPop: true,
        isError: false
      });
    } catch (err) {
      props.setAlertState({
        msg: err.message,
        isPop: true,
        isError: true
      });
    }
  }

  return (
    <ModalWrapper visible={props.isAddModalOpen}>
      <ModalContainer width='720px'>
        <ModalParagraph>새 카테고리를 만듭니다.</ModalParagraph>
        <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
          <Content>
            <PreviewTextWrapper>
              <Input type='text' themeMode={themeMode} placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
              <Input
                type='text'
                themeMode={themeMode}
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </PreviewTextWrapper>
            <SelectedImage>
              <label htmlFor='category-image-select'>
                <FontAwesomeIcon icon={faCamera} />
                &nbsp;Choose
              </label>
              <span hidden>
                <Input
                  id='category-image-select'
                  type='file'
                  themeMode={themeMode}
                  accept='image/x-png,image/jpeg'
                  onChange={(e) => setPreviewImage(e.target.value)}
                />
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
