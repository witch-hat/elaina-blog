import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import cloneDeep from 'lodash/cloneDeep';

import { BorderBox, AlertStateType } from 'src/components';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { CategoryDetails, UPDATE_CATEGORY } from 'src/query/category';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  alignItems: 'center'
});

const MenuContainer = styled.div({
  display: 'flex',
  padding: '4px 8px 0px 8px',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end'
});

const Wrapper = styled.div({
  display: 'flex',
  flexDirection: 'column',
  flex: 1
});

const Content = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '.8rem',
  height: '10rem'
});

const PreviewImage = styled.img({
  width: '260px',
  marginLeft: '1rem',
  height: '8.4rem',
  objectFit: 'cover',
  float: 'right',
  '@media screen and (max-width: 1380px)': {
    width: '32%',
    marginLeft: '3%'
  }
});

const PreviewTextWrapper = styled.div({
  width: '100%',
  display: 'flex',
  height: '8.4rem',
  flexDirection: 'column',
  alignItems: 'flex-start'
});

const Input = styled.input<{ themeMode: ThemeMode }>((props) => ({
  display: 'inline-block',
  width: '100%',
  height: '2rem',
  fontSize: '1.1rem',
  padding: '.2rem',
  outline: 'none',
  fontWeight: 'normal',
  border: `1px solid ${theme[props.themeMode].inputBorder}`,
  borderRadius: '.5rem',
  color: theme[props.themeMode].inputText,
  backgroundColor: theme[props.themeMode].inputBackground
}));

interface Props {
  categories: CategoryDetails[];
  index: number;
  initAlertState: AlertStateType;
  setCategories: React.Dispatch<React.SetStateAction<CategoryDetails[]>>;
  setEditingCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setAlertState: React.Dispatch<React.SetStateAction<AlertStateType>>;
}

export function CategoryEditor(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const titleEditInput = useRef<HTMLInputElement>(null);
  const descriptionEditInput = useRef<HTMLInputElement>(null);

  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  async function save() {
    props.setAlertState(props.initAlertState);

    try {
      if (titleEditInput.current && descriptionEditInput.current) {
        await updateCategory({
          variables: {
            id: props.categories[props.index]._id,
            title: titleEditInput.current?.value,
            description: descriptionEditInput.current?.value
          }
        });

        const copiedCategories = cloneDeep(props.categories);
        const editingCategory = copiedCategories[props.index];

        if (editingCategory) {
          editingCategory.title = titleEditInput.current.value;
          editingCategory.description = descriptionEditInput.current.value;
          props.setCategories(copiedCategories);
        }

        props.setEditingCategoryIndex(-1);
        props.setAlertState({
          msg: 'Update category successfully.',
          isPop: true,
          isError: false
        });
      }
    } catch (err) {
      props.setEditingCategoryIndex(-1);
      props.setAlertState({
        msg: err.message,
        isPop: true,
        isError: true
      });
    }
  }

  return (
    <Container>
      <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
        <Wrapper>
          <MenuContainer>
            <CircleRippleWrapper onClick={save}>
              <FontAwesomeIcon icon={faSave} style={{ fontSize: '1.25rem' }} />
            </CircleRippleWrapper>
            <CircleRippleWrapper
              onClick={() => {
                props.setEditingCategoryIndex(-1);
              }}
            >
              <FontAwesomeIcon icon={faTimesCircle} style={{ fontSize: '1.25rem' }} />
            </CircleRippleWrapper>
          </MenuContainer>
          <Content>
            <PreviewTextWrapper>
              <Input type='text' ref={titleEditInput} themeMode={themeMode} defaultValue={props.categories[props.index].title} />
              <Input
                type='text'
                ref={descriptionEditInput}
                themeMode={themeMode}
                defaultValue={props.categories[props.index].description}
              />
            </PreviewTextWrapper>
            <PreviewImage src={props.categories[props.index].previewImage} alt='preview image' />
          </Content>
        </Wrapper>
      </BorderBox>
    </Container>
  );
}
