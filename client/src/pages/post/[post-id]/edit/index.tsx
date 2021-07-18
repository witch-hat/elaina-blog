import React from 'react';
import { GetServerSideProps } from 'next';

import { appCommponProps } from 'src/pages/_app';
import { initApolloClient } from 'src/apollo/withApollo';
import { Writer } from 'src/pages/admin/writer/component/Writer';
import { GET_PROFILE } from 'src/query/profile';
import { FIND_POST_BY_ID } from 'src/query/post';
import { CategoryDetails, FIND_CATEGORY_BY_ID, GET_CATEGORIES_WITH_DETAILS } from 'src/query/category';

interface ServerSideProps {
  author: string;
  categories: CategoryDetails[];
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
  const postId = context.query['post-id'];

  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: `/post/${postId}`
      }
    };
  }

  const client = initApolloClient({}, context);

  const profile = await client.query({ query: GET_PROFILE });
  const author = profile.data.profile.name;

  const findPostResult = await client.query({ query: FIND_POST_BY_ID, variables: { requestUrl: postId } });
  const article = findPostResult.data.findPostByUrl.article;
  const title = findPostResult.data.findPostByUrl.title;
  const categoryId = findPostResult.data.findPostByUrl.categoryId;

  const category = await client.query({ query: FIND_CATEGORY_BY_ID, variables: { id: categoryId } });
  const categoryTitle = category.data.findCategoryById.title;

  const categoriesQuery = await client.query({ query: GET_CATEGORIES_WITH_DETAILS });
  const categories = categoriesQuery.data.categoriesWithDetails;

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
