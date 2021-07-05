import { GetServerSideProps } from 'next';
import styled from 'styled-components';

import { GET_CATEGORIES_WITH_DETAILS, CategoryDetails } from 'src/query/category';
import { initApolloClient } from 'src/apollo/withApollo';
import { FIND_SAME_CATEGORY_POSTS, Post } from 'src/query/post';

import { PostContainer } from './component/PostContainer';
import { CategoryContainer } from './component/CategoryContainer';

const Container = styled.div({
  display: 'flex',
  width: '1200px',
  margin: '0 auto',
  alignItems: 'flex-start',
  justifyContent: 'center'
});

interface ServerSideProps {
  categoryData: CategoryDetails[];
  postData: { _id: number; title: string; article: string }[];
}

interface Props extends ServerSideProps {}

export default function CategoryPage(props: Props) {
  return (
    <Container>
      <CategoryContainer categories={props.categoryData} />
      <PostContainer posts={props.postData} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const categoryId = context.resolvedUrl.split('/')[2];
  const apolloClient = initApolloClient({}, context);

  const { data: categoryData } = await apolloClient.query({ query: GET_CATEGORIES_WITH_DETAILS });
  const { data: postData } = await apolloClient.query({
    query: FIND_SAME_CATEGORY_POSTS,
    variables: { categoryId: Number.parseInt(categoryId) }
  });

  return {
    props: {
      categoryData: categoryData.categoriesWithDetails,
      postData: postData.findSameCategoryPosts.post
    }
  };
};
