import React from 'react';
import styled from 'styled-components';

import { CategoryDetailType } from 'src/query/category';

import { ContentCategoryItem } from './ContentCategoryItem';
import { NoCategory } from './NoCategory';
import { MemoizedPageButtonBox } from 'src/components/common/box/PageButtonBox';

const Container = styled.section({
  display: 'flex',
  width: '100%',
  padding: '.9rem 1rem',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexFlow: 'row wrap',
  '@media screen and (max-width: 767px)': {
    justifyContent: 'center'
  }
});

const FlexWrapper = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'center'
});

interface Props {
  categories: CategoryDetailType[];
  isLogin: boolean;
}

export function ContentCategory(props: Props) {
  return (
    <>
      <Container>
        {props.categories.length ? (
          props.categories.map((category) => {
            return <ContentCategoryItem key={category.title} category={category} />;
          })
        ) : (
          <NoCategory />
        )}
      </Container>
      <FlexWrapper>
        <MemoizedPageButtonBox currPage={1} elementsTotalCount={4} elementsInPage={12} />
      </FlexWrapper>
    </>
  );
}

export const MemoizedContentCategory = React.memo(ContentCategory);
