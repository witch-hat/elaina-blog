import React, { useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { initApolloClient } from 'src/apollo/withApollo';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { CategoryDetails, GET_CATEGORIES_WITH_DETAILS, ORDER_CATEGORY, UPDATE_CATEGORY } from 'src/query/category';
import { trans, Lang } from 'src/resources/languages';

import { AdminPageLayout } from '../component/AdminPageLayout';
import { CategoryContainer } from './component/CategoryContainer';
import { PageTitle } from '../component/PageTitle';

const Container = styled.div({
  width: '100%'
});

const ButtonWrapper = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end'
});

const AddButton = styled.button((props) => ({
  padding: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.theme.submitButtonColor,
  color: '#f1f2f3'
}));

interface ServerSideProps {}

interface Props extends AppCommonProps, ServerSideProps {
  categories: CategoryDetails[];
}

export default function Category(props: Props) {
  // const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <AdminPageLayout>
      <Container>
        <PageTitle title={trans(Lang.CategoryManage)} />
        <ButtonWrapper>
          <AddButton onClick={() => setIsAddModalOpen(true)}>Add</AddButton>
        </ButtonWrapper>
        <CategoryContainer categories={props.categories} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
      </Container>
    </AdminPageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login?url=%2Fadmin%2Fcategory'
      }
    };
  }

  const client = initApolloClient({}, context);
  const { data } = await client.query({ query: GET_CATEGORIES_WITH_DETAILS });

  const categories = data.categoriesWithDetails;

  return {
    props: {
      categories
    }
  };
};
