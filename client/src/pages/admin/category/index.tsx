import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPen, faTrash, faSave, faTimesCircle, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { BorderBox } from 'src/components';
import { AdminPageLayout } from '../component/AdminPageLayout';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { initApolloClient } from 'src/apollo/withApollo';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { CategoryDetails, DELETE_CATEGORY, GET_CATEGORY } from 'src/query/category';
import { ModalWrapper } from 'src/components';
import { useApollo } from 'src/apollo/apolloClient';
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

const ModalContainer = styled.div<{ width: string }>((props) => ({
  width: props.width,
  padding: '.5rem'
}));

const ModalParagraph = styled.p({
  width: '100%'
});

const ModalButtonContainer = styled.div({
  display: 'flex',
  width: '100%',
  marginTop: '1rem',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

const ModalButton = styled.button<{ themeMode?: ThemeMode }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  borderRadius: '.5rem',
  marginLeft: '.5rem',
  backgroundColor: props.themeMode ? theme[props.themeMode].dangerButtonColor : 'inherit',
  color: props.themeMode ? theme[props.themeMode].dangerContentText : 'inherit'
}));

const SelectedImage = styled.div({
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

interface Props extends AppCommonProps {
  categories: CategoryDetails[];
}

export default function Category(props: Props) {
  const [editingCategoryId, setEditingCategoryId] = useState<number>(-1);
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const categories: CategoryDetails[] = props.categories;
  const [deletedCategory, setDeletedCategory] = useState<{ isModalOpen: boolean; index?: number }>({ isModalOpen: false });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  // const [addCategory] = useMutation(ADD_CATEGORY);
  const router = useRouter();

  function editCategory(index: number) {
    if (editingCategoryId === index) {
      setEditingCategoryId(-1);
    } else {
      setEditingCategoryId(index);
    }
  }
  function saveEditing(index: number) {}

  function checkEditing() {}

  async function addNewCategory() {}

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
            if (index === editingCategoryId) {
              return (
                <CategoryContainer key={category.title}>
                  <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '4px 8px 0px 8px' }}
                      >
                        <CircleRippleWrapper
                          onClick={() => {
                            console.log('edit');
                          }}
                        >
                          <FontAwesomeIcon icon={faSave} style={{ fontSize: '1.25rem' }} />
                        </CircleRippleWrapper>
                        <CircleRippleWrapper
                          onClick={() => {
                            editCategory(index);
                          }}
                        >
                          <FontAwesomeIcon icon={faTimesCircle} style={{ fontSize: '1.25rem' }} />
                        </CircleRippleWrapper>
                      </div>
                      <Content>
                        <PreviewTextWrapper>
                          <Input type='text' themeMode={themeMode} defaultValue={category.title} />
                          <Input type='text' themeMode={themeMode} defaultValue={category.description} />
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
                  onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                    e.currentTarget.draggable = true;
                  }}
                  onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                    e.currentTarget.draggable = false;
                  }}
                >
                  <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div
                        style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '4px 8px 0px 8px' }}
                      >
                        <CircleRippleWrapper
                          onClick={() => {
                            // console.log('HERE');
                            editCategory(index);
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
                        <CircleRippleWrapper
                          onClick={() => {
                            console.log('HERE');
                          }}
                        >
                          <FontAwesomeIcon icon={faGripVertical} style={{ fontSize: '1.25rem' }} />
                        </CircleRippleWrapper>
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
