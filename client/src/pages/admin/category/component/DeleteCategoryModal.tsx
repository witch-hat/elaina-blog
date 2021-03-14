import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';

import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { ModalWrapper } from 'src/components';
import { DELETE_CATEGORY } from 'src/query/category';
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

const ModalButton = styled.button<{ themeMode?: ThemeMode }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  borderRadius: '.5rem',
  marginLeft: '.5rem',
  backgroundColor: props.themeMode ? theme[props.themeMode].dangerButtonColor : 'inherit',
  color: props.themeMode ? theme[props.themeMode].dangerContentText : 'inherit'
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
}

export function DeleteCategoryModal(props: Props) {
  console.log(props.index);
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const client = useApollo();
  const router = useRouter();
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

    const { data } = await deleteCategory({
      variables: {
        index: props.index
      }
    });

    const isSuccess = data.deleteCategory.isSuccess;

    if (isSuccess) {
      alert('deleted successfully');
      return router.reload();
    } else {
      const errorMsg = data.deleteCategory.errorMsg;
      alert(errorMsg);
      return router.reload();
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
            themeMode={themeMode}
          >
            예
          </ModalButton>
          <ModalButton onClick={() => props.setDeletedCategory({ isModalOpen: false })}>아니요</ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalWrapper>
  );
}
