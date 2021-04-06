import React from 'react';
import { InferGetServerSidePropsType, NextPageContext } from 'next';

import { initApolloClient } from 'src/apollo/withApollo';
import { Writer } from 'src/pages/admin/writer/component/Writer';
import { GET_PROFILE } from 'src/query/profile';
import { FIND_POST_BY_URL } from 'src/query/post';
import { FIND_CATEGORY_BY_ID, GET_CATEGORY } from 'src/query/category';

interface Props {
  author: InferGetServerSidePropsType<typeof getServerSideProps>;
  categories: InferGetServerSidePropsType<typeof getServerSideProps>;
  category: InferGetServerSidePropsType<typeof getServerSideProps>;
  title: InferGetServerSidePropsType<typeof getServerSideProps>;
  article: InferGetServerSidePropsType<typeof getServerSideProps>;
}

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

export async function getServerSideProps(context: NextPageContext) {
  const postId = context.query['post-id'];
  const client = initApolloClient({}, context);

  const profile = await client.query({ query: GET_PROFILE });
  const author = profile.data.profile.name;

  const findPostResult = await client.query({ query: FIND_POST_BY_URL, variables: { requestUrl: postId } });
  const article = findPostResult.data.findPostByUrl.article;
  const title = findPostResult.data.findPostByUrl.title;
  const categoryId = findPostResult.data.findPostByUrl.categoryId;

  const category = await client.query({ query: FIND_CATEGORY_BY_ID, variables: { id: categoryId } });
  const categoryTitle = category.data.findCategoryById.title;

  const categoriesQuery = await client.query({ query: GET_CATEGORY });
  const categories = categoriesQuery.data.categories;

  return {
    props: {
      author,
      title,
      article,
      category: categoryTitle,
      categories
    }
  };
}
