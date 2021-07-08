import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

import { AlertStateType } from 'src/components';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { ModalWrapper, BorderBox } from 'src/components';
import { ADD_CATEGORY, CategoryDetails } from 'src/query/category';

const Content = styled.div({
  display: 'flex',
  width: '100%',
  height: '10rem',
  padding: '.8rem',
  justifyContent: 'center',
  alignItems: 'center'
});

const PreviewTextWrapper = styled.div({
  display: 'flex',
  width: '100%',
  height: '8.4rem',
  flexDirection: 'column',
  alignItems: 'flex-start'
});

const Input = styled.input((props) => ({
  display: 'inline-block',
  width: '100%',
  height: '2rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${props.theme.inputBorder}`,
  backgroundColor: props.theme.inputBackground,
  borderRadius: '.5rem',
  fontSize: '1.1rem',
  fontWeight: 'normal',
  color: props.theme.inputText
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

const ModalButton = styled.button<{ save?: boolean }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  marginLeft: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.save ? props.theme.dangerButtonColor : 'inherit',
  color: props.save ? props.theme.dangerContentText : 'inherit'
}));

interface Props {
  isAddModalOpen: boolean;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: CategoryDetails[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryDetails[]>>;
  initAlertState: AlertStateType;
  setAlertState: React.Dispatch<React.SetStateAction<AlertStateType>>;
}

export function AddCategoryModal(props: Props) {
  const [title, setTitle] = useState('');
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
          title
        }
      });

      setNewCategory({
        _id: response.data.addCategory._id,
        title,
        postCount: 0,
        recentCreatedAt: new Date().getTime(),
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
              <Input type='text' placeholder='Title' value={title} maxLength={30} onChange={(e) => setTitle(e.target.value)} />
            </PreviewTextWrapper>
          </Content>
        </BorderBox>
        <ModalButtonContainer>
          <ModalButton
            onClick={() => {
              props.setIsAddModalOpen(false);
              addNewCategory();
            }}
            save={true}
          >
            저장
          </ModalButton>
          <ModalButton onClick={() => props.setIsAddModalOpen(false)}>취소</ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalWrapper>
  );
}
