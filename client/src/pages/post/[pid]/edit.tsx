import React from 'react';
import { GetServerSideProps } from 'next';

import { appCommponProps } from 'src/pages/_app';
import { initApolloClient } from 'src/lib/withApollo';
import { Writer } from 'src/components/pages/admin';
import { GetProfileQueryType, GET_PROFILE } from 'src/query/profile';
import { FindPostByIdQueryType, FindPostByIdVars, FIND_POST_BY_ID } from 'src/query/post';
import {
  CategoryDetailType,
  FIND_CATEGORY_BY_ID,
  GET_CATEGORIES_WITH_DETAILS,
  CategoryDetailsQueryType,
  FindCategoryByIdQueryType,
  FindCategoryByIdVars
} from 'src/query/category';

interface ServerSideProps {
  author: string;
  categories: CategoryDetailType[];
  category: string | undefined;
  title: string | undefined;
  article: string | undefined;
}

interface Props extends ServerSideProps {}

export default function PostEdit(props: Props) {
  return (
    <Writer
      author={props.author}
      categories={props.categories}
      category={props.category}
      title={props.title}
      article={props.article}
      isEdit
    ></Writer>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  const postId = context.query['pid'];

  if (!postId) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: `/post/${postId}`
      }
    };
  }

  const client = initApolloClient({}, context);

  const [profile, findPostResult, categoriesQuery] = await Promise.all([
    client.query<GetProfileQueryType>({ query: GET_PROFILE }),
    client.query<FindPostByIdQueryType, FindPostByIdVars>({ query: FIND_POST_BY_ID, variables: { id: `${postId}` } }),
    client.query<CategoryDetailsQueryType>({ query: GET_CATEGORIES_WITH_DETAILS })
  ]);
  const author = profile.data.profile.name;
  const article = findPostResult.data.findPostById.article;
  const title = findPostResult.data.findPostById.title;
  const categoryId = findPostResult.data.findPostById.categoryId;
  const categories = categoriesQuery.data.categoriesWithDetails;

  console.log(categoryId);

  const category = await client.query<FindCategoryByIdQueryType, FindCategoryByIdVars>({
    query: FIND_CATEGORY_BY_ID,
    variables: { id: categoryId }
  });
  const categoryTitle = category.data.findCategoryById.title;

  return {
    props: {
      author,
      title,
      article,
      category: categoryTitle,
      categories
    }
  };
};
