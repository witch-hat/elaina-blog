import React, { useCallback, useEffect, useState } from 'react';
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

  const [categoryTitle, setCategoryTitle] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');

  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    setCategoryTitle(props.categories[props.index].title);
    setCategoryDescription(props.categories[props.index].description);
  }, []);

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryTitle(e.target.value);
    },
    [categoryTitle]
  );

  const onDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryDescription(e.target.value);
    },
    [categoryDescription]
  );

  async function save() {
    props.setAlertState(props.initAlertState);

    try {
      if (!categoryTitle || !categoryDescription) {
        alert('제목 또는 소개를 입력해주세요.');
        return;
      }

      await updateCategory({
        variables: {
          id: props.categories[props.index]._id,
          title: categoryTitle,
          description: categoryDescription
        }
      });

      const copiedCategories = cloneDeep(props.categories);
      const editingCategory = copiedCategories[props.index];

      if (editingCategory) {
        editingCategory.title = categoryTitle;
        editingCategory.description = categoryDescription;
        props.setCategories(copiedCategories);
      }

      props.setEditingCategoryIndex(-1);
      props.setAlertState({
        msg: 'Update category successfully.',
        isPop: true,
        isError: false
      });
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
              <Input
                type='text'
                themeMode={themeMode}
                defaultValue={props.categories[props.index].title}
                value={categoryTitle}
                onChange={(e) => onTitleChange(e)}
              />
              <Input
                type='text'
                themeMode={themeMode}
                defaultValue={props.categories[props.index].description}
                value={categoryDescription}
                onChange={(e) => onDescriptionChange(e)}
              />
            </PreviewTextWrapper>
            <PreviewImage src={props.categories[props.index].previewImage} alt='preview image' />
          </Content>
        </Wrapper>
      </BorderBox>
    </Container>
  );
}
