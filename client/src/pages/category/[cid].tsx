import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { AppCommonProps } from 'src/pages/_app';
import { initializeApollo } from 'src/lib/apollo';
import { PostItem } from 'src/components/pages/main/post/PostItem';
import {
  FindSameCategoryPostsQueryType,
  FindSameCategoryPostsVars,
  FIND_SAME_CATEGORY_POSTS,
  GetLastestPostsQueryType,
  GetLatestPostsVars,
  GET_LATEST_POSTS,
  PostDetailDataType
} from 'src/query/post';
import { MemoizedPageButtonBox } from 'src/components/common/box/PageButtonBox';

const Container = styled.div({
  display: 'flex',
  width: '900px',
  margin: '0 auto',
  minHeight: 'calc(100vh - 4rem - 20px)',
  flexDirection: 'column'
});

const InfoWrapper = styled.div({
  display: 'flex',
  height: '2rem',
  marginBottom: '.5rem',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const CategoryTitle = styled.p({
  fontSize: '1.4rem',
  fontWeight: 'bold'
});

const WriteButton = styled.button({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px 5px',
  borderRadius: '50%',
  '&:hover': {
    backgroundColor: '#eee'
  }
});

const StyledHr = styled.hr((props) => ({
  width: '100%',
  margin: '0',
  border: 'none',
  borderBottom: `1px solid ${props.theme.borderColor}`
}));

const PostWrapper = styled.div<{ isEmpty: boolean }>((props) => ({
  width: '100%',
  padding: '0 1rem',
  flex: props.isEmpty ? 1 : 'none'
}));

const NoPosts = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center'
});

const FlexWrapper = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'center'
});

interface ServerSideProps {
  categoryTitle: string;
  posts: PostDetailDataType[];
  totalPosts: number;
}

interface Props extends ServerSideProps, AppCommonProps {}

export default function CategoryPage(props: Props) {
  const router = useRouter();

  const currPage = router.query.page as string;

  function handleWriteButtonClick() {
    router.push({ pathname: '/admin/writer', query: { category: props.categoryTitle } });
  }

  return (
    <Container>
      <InfoWrapper>
        <CategoryTitle>{props.categoryTitle}</CategoryTitle>
        {props.app.isLogin && (
          <WriteButton onClick={() => handleWriteButtonClick()}>
            <FontAwesomeIcon icon={faPlus} />
          </WriteButton>
        )}
      </InfoWrapper>
      <StyledHr />
      <PostWrapper isEmpty={!props.posts.length}>
        {props.posts.length ? (
          props.posts.map((post) => {
            return <PostItem key={post._id} post={post} />;
          })
        ) : (
          <NoPosts>No Posts....</NoPosts>
        )}
      </PostWrapper>
      <FlexWrapper>
        <MemoizedPageButtonBox elementsTotalCount={props.totalPosts} elementsInPage={10} currPage={Number.parseInt(currPage)} />
      </FlexWrapper>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  context.res.setHeader('Cache-Control', 'max-age=0, public, must-revalidate');

  const categoryId = (context.query.cid as string) || '0';
  const page = (context.query.page as string) || '0';
  const apolloClient = initializeApollo({}, context);

  if (categoryId === '0') {
    const { data } = await apolloClient.query<GetLastestPostsQueryType, GetLatestPostsVars>({
      query: GET_LATEST_POSTS,
      variables: {
        page: Number.parseInt(page)
      }
    });

    return {
      props: {
        categoryTitle: 'Latest',
        posts: data.getLatestPosts.posts,
        totalPosts: data.getLatestPosts.total
      }
    };
  }

  const sameCategoryPostsQueryResult = await apolloClient.query<FindSameCategoryPostsQueryType, FindSameCategoryPostsVars>({
    query: FIND_SAME_CATEGORY_POSTS,
    variables: { categoryId: Number.parseInt(categoryId), page: Number.parseInt(page) }
  });

  const categoryTitle = sameCategoryPostsQueryResult.data.findSameCategoryPosts.category.title;
  const posts = sameCategoryPostsQueryResult.data.findSameCategoryPosts.posts;
  const totalPosts = sameCategoryPostsQueryResult.data.findSameCategoryPosts.total;

  return {
    props: {
      categoryTitle,
      posts,
      totalPosts
    }
  };
};
