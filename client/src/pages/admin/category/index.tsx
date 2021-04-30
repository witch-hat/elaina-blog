import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPen, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import cloneDeep from 'lodash/cloneDeep';

import { BorderBox, AlertBox, AlertStateType } from 'src/components';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { initApolloClient } from 'src/apollo/withApollo';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { CategoryDetails, GET_CATEGORY, ORDER_CATEGORY, UPDATE_CATEGORY } from 'src/query/category';

import { AdminPageLayout } from '../component/AdminPageLayout';
import { DeleteCategoryModal } from './component/DeleteCategoryModal';
import { AddCategoryModal } from './component/AddCategoryModal';
import { CategoryContainer } from './component/CategoryContainer';

const Container = styled.div({
  width: '100%',
  padding: '0 5%'
});

const ButtonWrapper = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end'
});

const AddButton = styled.button<{ themeMode: ThemeMode }>((props) => ({
  padding: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: theme[props.themeMode].submitButtonColor,
  color: '#f1f2f3'
}));

interface Props extends AppCommonProps {
  categories: CategoryDetails[];
}

export default function Category(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <AdminPageLayout>
      <Container>
        <ButtonWrapper>
          <AddButton themeMode={themeMode} onClick={() => setIsAddModalOpen(true)}>
            Add
          </AddButton>
        </ButtonWrapper>
        <CategoryContainer categories={props.categories} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
      </Container>
    </AdminPageLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login'
      }
    };
  }

  const client = initApolloClient({}, context);
  const { data } = await client.query({ query: GET_CATEGORY });

  const categories = data.categories;

  return {
    props: {
      categories
    }
  };
}
