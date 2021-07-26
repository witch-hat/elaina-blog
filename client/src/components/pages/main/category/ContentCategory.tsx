import React from 'react';
import styled from 'styled-components';

import { CategoryDetailType } from 'src/query/category';

import { ContentCategoryItem } from './ContentCategoryItem';
import { NoCategory } from './NoCategory';

const Container = styled.section({
  display: 'flex',
  width: '100%',
  minHeight: 'calc(100vh - 4rem)',
  padding: '.9rem 1rem',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap'
});

interface Props {
  categories: CategoryDetailType[];
  latestPosts: ({ _id: number; categoryId: number; title: string; article: string } | null)[];
  isLogin: boolean;
}

export function ContentCategory(props: Props) {
  return (
    <Container>
      {props.categories.length ? (
        props.categories.map((category, index) => {
          return <ContentCategoryItem key={category.title} category={category} latestPost={props.latestPosts[index]} />;
        })
      ) : (
        <NoCategory />
      )}
    </Container>
  );
}

export const MemoizedContentCategory = React.memo(ContentCategory);
