import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { FocusWrapper } from 'src/components';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CategoryDetails } from 'src/query/category';

const CategoryContainer = styled.div<{ themeMode: ThemeMode }>((props) => ({
  position: 'relative',
  width: '100%',
  padding: '.5rem 0',
  border: `1px solid ${theme[props.themeMode].borderColor}`,
  borderRadius: '.5rem',
  cursor: 'pointer',
  wordBreak: 'break-all'
}));

const CategoryList = styled.ul<{ themeMode: ThemeMode }>((props) => ({
  position: 'absolute',
  top: '.125rem',
  left: '0',
  border: `1px solid ${theme[props.themeMode].borderColor}`,
  backgroundColor: theme[props.themeMode].secondaryContentBackground,
  borderRadius: '.5rem',
  boxShadow: `0 6px 3px -3px ${theme[props.themeMode].shadowColor}`,
  userSelect: 'none',
  zIndex: 1
}));

const CategoryTitle = styled.li<{ themeMode: ThemeMode }>((props) => ({
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
    backgroundColor: theme[props.themeMode].hoverBackground
  },
  '&:hover > p': {
    cursor: 'pointer'
  }
}));

interface Props {
  categories: CategoryDetails[];
  selectedCategory: string;
  changeCategory: (newCategory: string) => void;
}

export function CategorySelector(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [isListOpen, setIsListOpen] = useState(false);

  return (
    <CategoryContainer themeMode={themeMode}>
      <div onClick={() => setIsListOpen(!isListOpen)}>
        <p style={{ padding: '.2rem' }}>{props.selectedCategory}</p>
      </div>
      <FocusWrapper visible={isListOpen} onClickOutside={() => setIsListOpen(false)}>
        <CategoryList themeMode={themeMode}>
          {props.categories.map((category) => {
            return (
              <CategoryTitle
                key={category.title}
                onClick={() => {
                  props.changeCategory(category.title);
                  setIsListOpen(false);
                }}
                themeMode={themeMode}
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
