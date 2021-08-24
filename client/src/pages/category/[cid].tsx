import { GetServerSideProps } from 'next';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { AppCommonProps } from 'src/pages/_app';
import { initializeApollo } from 'src/lib/apollo';
import { PostItem } from 'src/components/pages/main/post/PostItem';
import { FindSameCategoryPostsQueryType, FindSameCategoryPostsVars, FIND_SAME_CATEGORY_POSTS, PostDetailDataType } from 'src/query/post';

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

interface ServerSideProps {
  categoryTitle: string;
  posts: PostDetailDataType[];
}

interface Props extends ServerSideProps, AppCommonProps {}

export default function CategoryPage(props: Props) {
  const router = useRouter();

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
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  context.res.setHeader('Cache-Control', 'max-age=0, public, must-revalidate');

  const categoryId = context.resolvedUrl.split('/')[2];
  const apolloClient = initializeApollo({}, context);

  const sameCategoryPostsQueryResult = await apolloClient.query<FindSameCategoryPostsQueryType, FindSameCategoryPostsVars>({
    query: FIND_SAME_CATEGORY_POSTS,
    variables: { categoryId: Number.parseInt(categoryId) }
  });

  const categoryTitle = sameCategoryPostsQueryResult.data.findSameCategoryPosts.category.title;
  const posts = sameCategoryPostsQueryResult.data.findSameCategoryPosts.post;

  return {
    props: {
      categoryTitle,
      posts
    }
  };
};
