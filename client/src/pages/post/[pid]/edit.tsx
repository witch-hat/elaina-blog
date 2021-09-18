import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useApolloClient, useMutation } from '@apollo/client';

import { appCommponProps } from 'src/pages/_app';
import { initializeApollo } from 'src/lib/apollo';
import { WriterLayout, PostInfo } from 'src/components/common/writer/WriterLayout';
import { GetProfileQueryType, GET_PROFILE } from 'src/query/profile';
import { FindPostByIdQueryType, FindPostByIdVars, FIND_POST_BY_ID, EDIT_POST, EditPostQueryType, EditPostVars } from 'src/query/post';
import {
  CategoryDetailType,
  FIND_CATEGORY_BY_ID,
  GET_CATEGORIES_WITH_DETAILS,
  CategoryDetailsQueryType,
  FindCategoryByIdQueryType,
  FindCategoryByIdVars
} from 'src/query/category';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';
import { trans, Lang } from 'src/resources/languages';

interface ServerSideProps {
  author: string;
  categories: CategoryDetailType[];
  category: string | undefined;
  title: string | undefined;
  article: string | undefined;
}

interface Props extends ServerSideProps {}

export default function PostEdit(props: Props) {
  const router = useRouter();

  const client = useApolloClient();
  const [editPost] = useMutation<EditPostQueryType, EditPostVars>(EDIT_POST);

  async function handleEditPost(postInfo: PostInfo, defaultCategory: string) {
    if (postInfo.title.length === 0) {
      alert('제목을 입력해주세요');
      return;
    }

    const { data } = await client.query<IsAuthQueryType>({ query: IS_AUTH });
    const isAdmin = data.isAuth.isSuccess;

    if (!isAdmin) {
      alert('로그인에러. 다시 로그인해주세요.');
      return router.push('/admin/login');
    }

    const id = +router.query['pid']!;

    try {
      await editPost({
        variables: {
          id,
          title: postInfo.title,
          article: postInfo.article,
          category: postInfo.category === defaultCategory ? '' : postInfo.category
        }
      });

      router.push(`/post/${id}`);
    } catch (err: any) {
      alert(err.message);
      return;
    }

    return;
  }

  return (
    <WriterLayout
      author={props.author}
      submitText={trans(Lang.Edit)}
      handleSubmit={handleEditPost}
      categories={props.categories}
      category={props.category}
      title={props.title}
      article={props.article}
    ></WriterLayout>
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

  const client = initializeApollo({}, context);

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
