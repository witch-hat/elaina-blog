import { GetServerSideProps } from 'next';
import styled from 'styled-components';

import { initApolloClient } from 'src/apollo/withApollo';
import { FIND_SAME_CATEGORY_POSTS, LatestPostQueryReturnType } from 'src/query/post';

import { PostItem } from '../../main/post/PostItem';

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

const StyledHr = styled.hr((props) => ({
  width: '100%',
  margin: '0',
  border: 'none',
  borderBottom: `1px solid ${props.theme.borderColor}`
}));

const PostWrapper = styled.div<{ isEmpty: boolean }>((props) => ({
  display: 'flex',
  width: '100%',
  padding: '0 1rem',
  flex: props.isEmpty ? 1 : 'none'
}));

const NoPosts = styled.div({
  display: 'flex',
  width: '100%',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'stretch'
});

interface ServerSideProps {
  categoryTitle: string;
  posts: LatestPostQueryReturnType[];
}

interface Props extends ServerSideProps {}

export default function CategoryPage(props: Props) {
  return (
    <Container>
      <InfoWrapper>
        <CategoryTitle>{props.categoryTitle}</CategoryTitle>
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
  const apolloClient = initApolloClient({}, context);

  const sameCategoryPostsQueryResult = await apolloClient.query({
    query: FIND_SAME_CATEGORY_POSTS,
    variables: { categoryId: Number.parseInt(categoryId) }
  });

  const categoryTitle = sameCategoryPostsQueryResult.data.findSameCategoryPosts.category.title;
  const posts: LatestPostQueryReturnType[] = sameCategoryPostsQueryResult.data.findSameCategoryPosts.post;

  return {
    props: {
      categoryTitle,
      posts
    }
  };
};
