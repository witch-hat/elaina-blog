import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPen, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import cloneDeep from 'lodash/cloneDeep';

import { BorderBox } from 'src/components';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { initApolloClient } from 'src/apollo/withApollo';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { CategoryDetails, GET_CATEGORY, ORDER_CATEGORY, UPDATE_CATEGORY } from 'src/query/category';
import { AdminPageLayout } from '../component/AdminPageLayout';
import { DeleteCategoryModal } from './component/DeleteCategoryModal';
import { AddCategoryModal } from './component/AddCategoryModal';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

const AddButton = styled.button<{ themeMode: ThemeMode }>((props) => ({
  padding: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: theme[props.themeMode].submitButtonColor,
  color: '#f1f2f3'
}));

const CategoryContainer = styled.div({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
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

const PreviewTitle = styled.span({
  flexShrink: 0,
  height: '2rem',
  width: '100%',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  textAlign: 'left',
  wordBreak: 'break-all',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '@media screen and (max-width: 1380px)': {
    wordBreak: 'break-all'
  }
});

const PreviewContent = styled.span({
  flexShrink: 0,
  width: '100%',
  height: '4.5rem',
  fontSize: '1.1rem',
  margin: '.25rem 0 0',
  wordBreak: 'keep-all',
  textAlign: 'left',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

const GrabButtonContainer = styled.div({
  '&:hover > *': {
    cursor: 'grab'
  }
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
  borderRadius: '8px',
  color: theme[props.themeMode].inputText,
  backgroundColor: theme[props.themeMode].inputBackground
}));

interface Props extends AppCommonProps {
  categories: CategoryDetails[];
}

export default function Category(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [grabbedElement, setGrabbedElement] = useState<(EventTarget & HTMLDivElement) | null>(null);
  const [grabbingCategoryIndex, setGrabbingCategoryIndex] = useState<number>(-1);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number>(-1);
  const [categories, setCategories] = useState<CategoryDetails[]>(props.categories);
  const [deletedCategory, setDeletedCategory] = useState<{ isModalOpen: boolean; index?: number }>({ isModalOpen: false });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [addCategory] = useMutation(ADD_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [orderCategory] = useMutation(ORDER_CATEGORY);
  const titleEditInput = useRef<HTMLInputElement>(null);
  const descriptionEditInput = useRef<HTMLInputElement>(null);

  async function save() {
    if (titleEditInput.current && descriptionEditInput.current) {
      const response = await updateCategory({
        variables: {
          id: categories[editingCategoryIndex]._id,
          title: titleEditInput.current?.value,
          description: descriptionEditInput.current?.value
        }
      });

      if (response.data.updateCategory.isSuccess) {
        const copiedCategories = cloneDeep(categories);
        const editingCategory = copiedCategories[editingCategoryIndex];

        if (editingCategory !== undefined) {
          editingCategory.title = titleEditInput.current.value;
          editingCategory.description = descriptionEditInput.current.value;
          setCategories(copiedCategories);
        }

        setEditingCategoryIndex(-1);
      } else {
        alert(response.data.updateCategory.errorMsg);
      }
    }
  }

  function onDragStart(e: React.DragEvent<HTMLDivElement>) {
    setGrabbedElement(e.currentTarget);
    e.dataTransfer.effectAllowed = 'move';
    // @ts-ignore
    e.dataTransfer.setData('text/html', e.currentTarget);
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  function onDragEnd(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.dropEffect = 'move';
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    let grabPosition = Number(grabbedElement?.dataset.position);
    let dropPosition = Number(e.currentTarget.dataset.position);

    try {
      const newCategories = [...categories];
      newCategories[grabPosition] = newCategories.splice(dropPosition, 1, newCategories[grabPosition])[0];

      orderCategory({
        variables: {
          ids: newCategories.map((category) => category._id)
        }
      });
      setCategories(newCategories);
      setGrabbingCategoryIndex(-1);
    } catch (e) {
      const backUpCategories = [...categories];
      setCategories(backUpCategories);
    }
  }

  return (
    <AdminPageLayout>
      <div style={{ width: '100%', padding: '0 5%' }}>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          <AddButton themeMode={themeMode} onClick={() => setIsAddModalOpen(true)}>
            Add
          </AddButton>
        </div>
        <Container>
          {categories.map((category, index) => {
            if (index === editingCategoryIndex) {
              return (
                <CategoryContainer key={category.title}>
                  <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '4px 8px 0px 8px' }}
                      >
                        <CircleRippleWrapper onClick={save}>
                          <FontAwesomeIcon icon={faSave} style={{ fontSize: '1.25rem' }} />
                        </CircleRippleWrapper>
                        <CircleRippleWrapper
                          onClick={() => {
                            setEditingCategoryIndex(-1);
                          }}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} style={{ fontSize: '1.25rem' }} />
                        </CircleRippleWrapper>
                      </div>
                      <Content>
                        <PreviewTextWrapper>
                          <Input type='text' ref={titleEditInput} themeMode={themeMode} defaultValue={category.title} />
                          <Input type='text' ref={descriptionEditInput} themeMode={themeMode} defaultValue={category.description} />
                        </PreviewTextWrapper>
                        <PreviewImage src={category.previewImage} alt='preview image' />
                      </Content>
                    </div>
                  </BorderBox>
                </CategoryContainer>
              );
            } else {
              return (
                <CategoryContainer
                  key={category.title}
                  data-position={index}
                  draggable={grabbingCategoryIndex === index}
                  onDragOver={(e: React.DragEvent<HTMLDivElement>) => onDragOver(e)}
                  onDragStart={(e: React.DragEvent<HTMLDivElement>) => grabbingCategoryIndex > -1 && onDragStart(e)}
                  onDragEnd={(e: React.DragEvent<HTMLDivElement>) => grabbingCategoryIndex > -1 && onDragEnd(e)}
                  onDrop={(e: React.DragEvent<HTMLDivElement>) => grabbingCategoryIndex > -1 && onDrop(e)}
                >
                  <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '4px 8px 0px 8px' }}
                      >
                        <CircleRippleWrapper
                          onClick={() => {
                            setEditingCategoryIndex(index);
                          }}
                        >
                          <FontAwesomeIcon icon={faPen} style={{ fontSize: '1.25rem' }} />
                        </CircleRippleWrapper>
                        <CircleRippleWrapper
                          onClick={() => {
                            setDeletedCategory({ isModalOpen: true, index });
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.25rem' }} />
                        </CircleRippleWrapper>
                        <GrabButtonContainer
                          onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                            if (e.button === 0) {
                              setGrabbingCategoryIndex(index);
                            } else {
                              setGrabbingCategoryIndex(-1);
                            }
                          }}
                          onMouseUp={() => {
                            setGrabbingCategoryIndex(-1);
                          }}
                          onTouchStart={() => setGrabbingCategoryIndex(index)}
                        >
                          <CircleRippleWrapper onClick={() => {}}>
                            <FontAwesomeIcon icon={faGripVertical} style={{ fontSize: '1.25rem' }} />
                          </CircleRippleWrapper>
                        </GrabButtonContainer>
                      </div>
                      <Content>
                        <PreviewTextWrapper>
                          <PreviewTitle>{category.title}</PreviewTitle>
                          <PreviewContent>{category.description}</PreviewContent>
                        </PreviewTextWrapper>
                        <PreviewImage src={category.previewImage} alt='preview image' />
                      </Content>
                    </div>
                  </BorderBox>
                </CategoryContainer>
              );
            }
          })}
        </Container>
        <DeleteCategoryModal
          isDeleteModalOpen={deletedCategory.isModalOpen}
          setDeletedCategory={setDeletedCategory}
          index={deletedCategory.index}
          defaultCategoryTitle={categories.filter((category) => category._id === 0)[0].title}
        />
        <AddCategoryModal isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
      </div>
    </AdminPageLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login'
      }
    };
  }

  const client = initApolloClient({}, context);
  const { data } = await client.query({ query: GET_CATEGORY });

  const categories = data.categories;

  return {
    props: {
      categories
    }
  };
}
