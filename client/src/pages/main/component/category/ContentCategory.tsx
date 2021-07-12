import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

import { CategoryDetails } from 'src/query/category';

import { ContentCategoryItem } from './ContentCategoryItem';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '.9rem 0',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

const Item = styled.div((props) => ({
  width: '100%',
  '&:hover': {
    cursor: props.onClick ? 'pointer' : 'default !important'
  }
}));

interface Props {
  categories: CategoryDetails[];
  latestPosts: ({ _id: number; categoryId: number; title: string; article: string } | null)[];
  isLogin: boolean;
}

export function ContentCategory(props: Props) {
  const router = useRouter();

  return (
    <section style={{ width: '100%' }}>
      <Container>
        {props.categories.map((category, index) => {
          if (props.latestPosts[index] === null) {
            if (props.isLogin) {
              return (
                <Item key={category.title} onClick={() => router.push(`/admin/writer?category=${category.title}`)}>
                  <ContentCategoryItem category={category} latestPost={null} />
                </Item>
              );
            }
            return (
              <Item key={category.title}>
                <ContentCategoryItem category={category} isEmpty={true} latestPost={null} />
              </Item>
            );
          }
          return (
            <Item key={category.title}>
              <Link href={`/category/${category._id}`}>
                <a>
                  <ContentCategoryItem category={category} latestPost={props.latestPosts[index]} />
                </a>
              </Link>
            </Item>
          );
        })}
      </Container>
    </section>
  );
}

export const MemoizedContentCategory = React.memo(ContentCategory);
