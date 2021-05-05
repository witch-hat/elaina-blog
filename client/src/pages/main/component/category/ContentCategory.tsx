import React from 'react';
import { useRouter } from 'next/router';
import styled, { css, keyframes } from 'styled-components';
import Link from 'next/link';

import { BorderBox } from 'src/components';
import { CategoryDetails } from 'src/query/category';

import { ContentCategoryDetails } from './ContentCategoryDetails';
import ContentCategoryItem from './ContentCategoryItem';

const MoveUp = keyframes({
  from: {
    opacity: '0',
    transform: 'translateY(1.5rem)'
  },
  to: {
    opacity: '1',
    transform: 'translateY(0)'
  }
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '.9rem 0',
  justifyContent: 'center',
  alignItems: 'center'
});

const Item = styled.div(
  {
    width: '100%',
    opacity: '0'
  },
  css<{ index: number }>`
    animation: ${MoveUp} 0.4s ease-out forwards;
    animation-delay: ${(props) => props.index * 0.25}s;
  `
);

interface Props {
  categories: CategoryDetails[];
  latestPosts: [{ _id: number }];
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
                <Item key={category.title} onClick={() => router.push(`/admin/writer?category=${category.title}`)} index={index}>
                  <ContentCategoryItem category={category} />
                </Item>
              );
            } else {
              return (
                <Item key={category.title} index={index}>
                  <ContentCategoryItem category={category} isEmpty={true} />
                </Item>
              );
            }
          }
          return (
            <Item key={category.title} onClick={() => router.push(`/post/${props.latestPosts[index]._id}`)} index={index}>
              <ContentCategoryItem category={category} />
            </Item>
          );
        })}
      </Container>
    </section>
  );
}
