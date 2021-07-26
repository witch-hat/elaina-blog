import React, { useState } from 'react';
import styled from 'styled-components';

import { FocusWrapper } from 'src/components';
import { CategoryDetailType } from 'src/query/category';

const CategoryContainer = styled.div((props) => ({
  position: 'relative',
  width: '100%',
  padding: '.5rem 0',
  border: `1px solid ${props.theme.borderColor}`,
  borderRadius: '.5rem',
  cursor: 'pointer',
  wordBreak: 'break-all'
}));

const CategoryList = styled.ul((props) => ({
  position: 'absolute',
  top: '.125rem',
  left: '0',
  border: `1px solid ${props.theme.borderColor}`,
  backgroundColor: props.theme.secondaryContentBackground,
  borderRadius: '.5rem',
  boxShadow: `0 6px 3px -3px ${props.theme.shadowColor}`,
  userSelect: 'none',
  zIndex: 1
}));

const CategoryTitle = styled.li((props) => ({
  display: '-webkit-box',
  width: '100%',
  height: 'fit-content',
  padding: '.25rem',
  borderRadius: '.5rem',
  overflow: 'hidden',
  wordBreak: 'break-all',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '&:hover': {
    backgroundColor: props.theme.hoverBackground
  },
  '&:hover > p': {
    cursor: 'pointer'
  }
}));

interface Props {
  categories: CategoryDetailType[];
  default: string;
  selectedCategory: string;
  changeCategory: (newCategory: string) => void;
}

export function CategorySelector(props: Props) {
  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <CategoryContainer>
      <div onClick={() => setIsListOpen(!isListOpen)}>
        <p style={{ padding: '.2rem' }}>{props.selectedCategory}</p>
      </div>
      <FocusWrapper visible={isListOpen} onClickOutside={() => setIsListOpen(false)}>
        <CategoryList>
          <CategoryTitle
            onClick={() => {
              props.changeCategory(props.default);
              setIsListOpen(false);
            }}
          >
            <p>{props.default}</p>
          </CategoryTitle>
          {props.categories.map((category) => {
            return (
              <CategoryTitle
                key={category.title}
                onClick={() => {
                  props.changeCategory(category.title);
                  setIsListOpen(false);
                }}
              >
                <p>{category.title}</p>
              </CategoryTitle>
            );
          })}
        </CategoryList>
      </FocusWrapper>
    </CategoryContainer>
  );
}
