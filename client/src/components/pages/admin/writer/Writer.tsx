import { useRouter } from 'next/router';
import { useMutation, useApolloClient } from '@apollo/client';

import { trans, Lang } from 'src/resources/languages';
import { CategoryDetailType } from 'src/query/category';
import { WritePostQueryType, WritePostVars, WRITE_POST } from 'src/query/post';
import { IsAuthQueryType, IS_AUTH } from 'src/query/user';

import { WriterLayout, PostInfo } from 'src/components/common/writer/WriterLayout';

interface Props {
  author: string;
  categories: CategoryDetailType[];
}

export function Writer(props: Props) {
  const router = useRouter();

  const client = useApolloClient();
  const [writePost] = useMutation<WritePostQueryType, WritePostVars>(WRITE_POST);

  async function handleCreatePost(postInfo: PostInfo, defaultCategory: string) {
    if (postInfo.title.length === 0) {
      alert('제목을 입력해주세요');
      return;
    }

    if (postInfo.article.length === 0) {
      alert('본문을 1글자 이상 써주세요');
      return;
    }

    const { data } = await client.query<IsAuthQueryType>({ query: IS_AUTH });
    const isAdmin = data.isAuth.isSuccess;

    if (!isAdmin) {
      alert('로그인에러. 다시 로그인해주세요.');
      router.push('/admin/login');
      return;
    }

    try {
      const { data: newPostData } = await writePost({
        variables: {
          title: postInfo.title,
          createdAt: new Date(),
          article: postInfo.article,
          category: postInfo.category === defaultCategory ? '' : postInfo.category
        }
      });

      if (!newPostData) {
        alert('Cannot create post... please retry!');
        return;
      }

      router.push(`/post/${newPostData.writePost._id}`);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <WriterLayout author={props.author} categories={props.categories} submitText={trans(Lang.Writing)} handleSubmit={handleCreatePost} />
  );
}
