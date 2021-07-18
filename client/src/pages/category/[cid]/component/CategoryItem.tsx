import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Container = styled.li<{ isSelected: boolean }>((props) => ({
  width: '100%',
  padding: '.5rem 0',
  borderLeft: props.isSelected ? props.theme.navList.selectedBorderLeft : 'none',
  borderBottom: `1px solid ${props.theme.borderColor}`,
  fontWeight: props.isSelected ? 'bold' : 'normal',
  color: props.isSelected ? props.theme.navList.selectedColor : 'inherit',
  textDecoration: props.isSelected ? 'underline' : 'none',
  listStyle: 'none',
  transition: '.2s all',
  userSelect: 'none',
  '&:hover': {
    color: props.theme.navList.hoverColor,
    marginLeft: props.theme.navList.hoverMarginLeft,
    borderLeft: props.theme.navList.hoverBorderLeft,
    fontWeight: 'bold',
    cursor: 'pointer'
  }
}));

const CategoryTitle = styled.p({
  display: '-webkit-box',
  width: '100%',
  padding: '0 .5rem',
  wordBreak: 'break-all',
  textAlign: 'left',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '&:hover': {
    cursor: 'pointer'
  }
});

interface Props {
  title: string;
  id: number;
}

export function CategoryItem(props: Props) {
  const router = useRouter();
  const id = router.asPath.split('/')[2];

  return (
    <Container isSelected={props.id === +id}>
      {props.id === +id ? (
        <CategoryTitle>{props.title}</CategoryTitle>
      ) : (
        <Link href={`/category/${props.id}`}>
          <a>
            <CategoryTitle>{props.title}</CategoryTitle>
          </a>
        </Link>
      )}
    </Container>
  );
}

export const MemoizedCategoryItem = React.memo(CategoryItem);
