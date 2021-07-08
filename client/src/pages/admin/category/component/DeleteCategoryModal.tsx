import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { ModalWrapper, AlertStateType } from 'src/components';
import { DELETE_CATEGORY, CategoryDetails } from 'src/query/category';
import { theme } from 'src/styles';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';

const ModalContainer = styled.div((props) => ({
  width: '25rem',
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

const ModalButton = styled.button<{ delete?: boolean }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  marginLeft: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.delete ? props.theme.dangerButton.buttonColor : 'inherit',
  color: props.delete ? props.theme.dangerButton.textColor : 'inherit'
}));

interface Props {
  isDeleteModalOpen: boolean;
  setDeletedCategory: React.Dispatch<
    React.SetStateAction<{
      isModalOpen: boolean;
      index?: number | undefined;
    }>
  >;
  index: number | undefined;
  defaultCategoryTitle: string;
  categories: CategoryDetails[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryDetails[]>>;
  initAlertState: AlertStateType;
  setAlertState: React.Dispatch<React.SetStateAction<AlertStateType>>;
}

export function DeleteCategoryModal(props: Props) {
  // const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const router = useRouter();

  const client = useApollo();
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  async function handleDeleteCategory() {
    const authResponse = await client.query({ query: IS_AUTH });

    if (!authResponse.data.isAuth.isAuth) {
      alert('auth failed');
      return router.push('/admin/login');
    }

    if (props.index === undefined) {
      return;
    }

    props.setAlertState(props.initAlertState);

    try {
      await deleteCategory({
        variables: {
          index: props.index
        }
      });

      const filteredCategories = props.categories.filter((category) => category.order != props.index);
      const orderedCategories = filteredCategories.map((category) => {
        if (props.index !== undefined && category.order > props.index) {
          return { ...category, order: category.order - 1 };
        } else {
          return category;
        }
      });

      props.setCategories(orderedCategories);
      props.setAlertState({
        msg: 'Category deleted successfully.',
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
    <ModalWrapper visible={props.isDeleteModalOpen}>
      <ModalContainer>
        <ModalParagraph>{`정말 삭제하시겠습니까?\n 글은 "${props.defaultCategoryTitle}" 카테로리로 이동됩니다.`}</ModalParagraph>
        <ModalButtonContainer>
          <ModalButton
            onClick={() => {
              props.setDeletedCategory({ isModalOpen: false });
              handleDeleteCategory();
            }}
            delete
          >
            예
          </ModalButton>
          <ModalButton onClick={() => props.setDeletedCategory({ isModalOpen: false })}>아니요</ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalWrapper>
  );
}
