import React, { useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import { trans, Lang } from 'src/resources/languages';
import { initializeApollo } from 'src/lib/apollo';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { AdminPageLayout, PageTitle, CategoryContainer } from 'src/components/pages/admin';
import { CategoryDetailsQueryType, CategoryDetailType, GET_CATEGORIES_WITH_DETAILS } from 'src/query/category';

const Container = styled.div({
  width: '100%'
});

interface ServerSideProps {}

interface Props extends AppCommonProps, ServerSideProps {
  categories: CategoryDetailType[];
}

export default function Category(props: Props) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <AdminPageLayout>
      <Container>
        <PageTitle title={trans(Lang.CategoryManage)} />
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

  context.res.setHeader('Cache-Control', 'max-age=0, public, must-revalidate');

  const client = initializeApollo({}, context);
  const { data } = await client.query<CategoryDetailsQueryType>({ query: GET_CATEGORIES_WITH_DETAILS });

  const categories = data.categoriesWithDetails;

  return {
    props: {
      categories
    }
  };
};
