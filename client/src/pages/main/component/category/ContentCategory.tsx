import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import { BorderBox } from 'src/components';
import { CategoryDetails } from 'src/query/category';

import { ContentCategoryDetails } from './ContentCategoryDetails';
import LinkedCategory from './LinkedCategory';
import UnlinkedCategory from './UnlinkedCategory';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '.9rem 0',
  justifyContent: 'center',
  alignItems: 'center',
  '& > div:nth-child(1)': {
    margin: '0 0 .8rem !important'
  }
});

interface Props {
  categories: CategoryDetails[];
  latestPosts: [{ _id: number }];
  isLogin: boolean;
}

export function ContentCategory(props: Props) {
  return (
    <section style={{ width: '100%' }}>
      <Container>
        {props.categories.map((category, index) => {
          if (props.latestPosts[index] === null) {
            if (props.isLogin) {
              return <LinkedCategory key={category.title} path={`/admin/writer?category=${category.title}`} category={category} />;
            } else {
              return <UnlinkedCategory key={category.title} category={category} />;
            }
          }
          return <LinkedCategory key={category.title} path={`/post/${props.latestPosts[index]._id}`} category={category} />;
        })}
      </Container>
    </section>
  );
}
