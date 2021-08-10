import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

import { DropDownMenu } from 'src/components';
import { CategoryDetailType } from 'src/query/category';

const CategoryDropDown = styled.div((props) => ({
  width: '16rem'
}));

const MainButton = styled.div({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between'
});

const CategoryTitle = styled.p((props) => ({
  display: '-webkit-box',
  width: '100%',
  height: 'fit-content',
  padding: '.5rem',
  borderRadius: '.5rem',
  overflow: 'hidden',
  wordBreak: 'break-all',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '&:hover': {
    backgroundColor: props.theme.hoverBackground,
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
  return (
    <CategoryDropDown>
      <DropDownMenu
        mainButton={
          <MainButton>
            <p>{props.selectedCategory}</p>
            <FontAwesomeIcon icon={faCaretDown} />
          </MainButton>
        }
        dropMenu={
          <>
            <CategoryTitle
              onClick={() => {
                props.changeCategory(props.default);
              }}
            >
              {props.default}
            </CategoryTitle>
            {props.categories.map((category) => {
              return (
                <CategoryTitle key={category.title} onClick={() => props.changeCategory(category.title)}>
                  {category.title}
                </CategoryTitle>
              );
            })}
          </>
        }
      />
    </CategoryDropDown>
  );
}
