import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Link from 'next/link';

import { CategoryDetailType } from 'src/query/category';

import { ContentCategoryItem } from './ContentCategoryItem';
import { NoCategory } from './NoCategory';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  minHeight: 'calc(100vh - 4rem)',
  padding: '.9rem 1rem',
  flexDirection: 'column',
  alignItems: 'center'
});

const Item = styled.div<{ pointer?: boolean }>((props) => ({
  width: '100%',
  '&:hover': {
    cursor: props.pointer ? 'pointer' : 'default !important'
  }
}));

interface Props {
  categories: CategoryDetailType[];
  latestPosts: ({ _id: number; categoryId: number; title: string; article: string } | null)[];
  isLogin: boolean;
}

export function ContentCategory(props: Props) {
  const router = useRouter();

  return (
    <section style={{ width: '100%' }}>
      <Container>
        {props.categories.length ? (
          props.categories.map((category, index) => {
            if (props.latestPosts[index] === null) {
              if (props.isLogin) {
                return (
                  <Item key={category.title} onClick={() => router.push(`/admin/writer?category=${category.title}`)} pointer>
                    <ContentCategoryItem category={category} latestPost={null} isLogin={props.isLogin} />
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
              <Item key={category.title} pointer>
                <Link href={`/category/${category._id}`}>
                  <a>
                    <ContentCategoryItem category={category} latestPost={props.latestPosts[index]} />
                  </a>
                </Link>
              </Item>
            );
          })
        ) : (
          <NoCategory />
        )}
      </Container>
    </section>
  );
}

export const MemoizedContentCategory = React.memo(ContentCategory);
