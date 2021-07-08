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
  flex: 1,
  flexDirection: 'column'
});

const Content = styled.div({
  display: 'flex',
  width: '100%',
  height: '10rem',
  padding: '.8rem',
  justifyContent: 'center',
  alignItems: 'center'
});

const PreviewImage = styled.img({
  float: 'right',
  width: '260px',
  height: '8.4rem',
  marginLeft: '1rem',
  objectFit: 'cover',
  '@media screen and (max-width: 1380px)': {
    width: '32%',
    marginLeft: '3%'
  }
});

const PreviewTextWrapper = styled.div({
  display: 'flex',
  width: '100%',
  height: '8.4rem',
  flexDirection: 'column',
  alignItems: 'flex-start'
});

const Input = styled.input((props) => ({
  display: 'inline-block',
  width: '100%',
  height: '2rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${props.theme.inputBorder}`,
  borderRadius: '.5rem',
  backgroundColor: props.theme.inputBackground,
  fontSize: '1.1rem',
  fontWeight: 'normal',
  color: props.theme.inputText
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
  // const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [categoryTitle, setCategoryTitle] = useState('');

  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  useEffect(() => {
    setCategoryTitle(props.categories[props.index].title);
  }, []);

  const onTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCategoryTitle(e.target.value);
    },
    [categoryTitle]
  );

  async function save() {
    props.setAlertState(props.initAlertState);

    try {
      if (!categoryTitle) {
        alert('제목을 입력해주세요.');
        return;
      }

      await updateCategory({
        variables: {
          id: props.categories[props.index]._id,
          title: categoryTitle
        }
      });

      const copiedCategories = cloneDeep(props.categories);
      const editingCategory = copiedCategories[props.index];

      if (editingCategory) {
        editingCategory.title = categoryTitle;
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
              <Input type='text' defaultValue={props.categories[props.index].title} onChange={(e) => onTitleChange(e)} />
            </PreviewTextWrapper>
          </Content>
        </Wrapper>
      </BorderBox>
    </Container>
  );
}
