import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { GET_CATEGORIES_WITH_DETAILS, CategoryDetailType } from 'src/query/category';
import { initApolloClient } from 'src/apollo/withApollo';
import { FIND_SAME_CATEGORY_POSTS } from 'src/query/post';

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
  categories: CategoryDetailType[];
  posts: { _id: number; title: string; article: string }[];
}

interface Props extends ServerSideProps {}

export default function CategoryPage(props: Props) {
  const router = useRouter();

  const cid = router.asPath.split('/')[2];
  const postCount = props.categories.filter((category) => category._id === +cid)[0].postCount;

  return (
    <Container>
      <CategoryContainer categories={props.categories} />
      <PostContainer posts={props.posts} postCount={postCount || 0} />
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  context.res.setHeader('Cache-Control', 'max-age=0, public, must-revalidate');

  const categoryId = context.resolvedUrl.split('/')[2];
  const apolloClient = initApolloClient({}, context);

  const [categoryDetailsQueryResult, sameCategoryPostsQueryResult] = await Promise.all([
    apolloClient.query({ query: GET_CATEGORIES_WITH_DETAILS }),
    apolloClient.query({
      query: FIND_SAME_CATEGORY_POSTS,
      variables: { categoryId: Number.parseInt(categoryId) }
    })
  ]);

  const categories: CategoryDetailType[] = categoryDetailsQueryResult.data.categoriesWithDetails;
  const posts: { _id: number; title: string; article: string }[] = sameCategoryPostsQueryResult.data.findSameCategoryPosts.post;

  return {
    props: {
      categories,
      posts
    }
  };
};
