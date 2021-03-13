import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { InferGetServerSidePropsType, NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { BorderBox } from 'src/components';
import { AdminPageLayout } from '../component/AdminPageLayout';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { initApolloClient } from 'src/apollo/withApollo';
import { AppCommonProps } from 'src/pages/_app';
import { ADD_CATEGORY, CategoryDetails, DELETE_CATEGORY, GET_CATEGORY, GET_CATEGORIES_WITH_DETAILS } from 'src/query/category';
import { ModalWrapper } from 'src/components';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const CategoryContainer = styled.div({
  width: '90%',
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
  wordBreak: 'keep-all',
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

const ButtonContainer = styled.div({
  marginLeft: '1rem',
  display: 'flex',
  height: 'max-content'
});

const Button = styled.button<{ danger?: boolean; themeMode: ThemeMode }>((props) => ({
  marginRight: '.5rem',
  fontSize: '.9rem',
  borderRadius: '4px',
  padding: '.5rem',
  height: 'max-content',
  backgroundColor: props.danger ? theme[props.themeMode].dangerButtonColor : theme[props.themeMode].buttonBackground,
  color: props.danger ? theme[props.themeMode].dangerContentText : 'inherit',
  '&:hover': {
    textDecoration: 'underline'
  }
}));

const InputContainer = styled.div({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  margin: '.71rem 0'
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

const ModalContainer = styled.div({
  width: '20rem',
  padding: '.5rem'
});

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

interface Props extends AppCommonProps {
  categories: CategoryDetails[];
}

export default function Category(props: Props) {
  const [editingCategoryId, setEditingCategoryId] = useState<number>(-1);
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const categories: CategoryDetails[] = props.categories;
  const titleRef = useRef<HTMLSpanElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const client = useApollo();
  const [deleteCategory] = useMutation(DELETE_CATEGORY);
  // const [addCategory] = useMutation(ADD_CATEGORY);
  const router = useRouter();

  function editCategory(index: number) {
    if (editingCategoryId === index) {
      setEditingCategoryId(-1);
    } else {
      setEditingCategoryId(index);
    }
  }

  async function handleDeleteCategory() {
    const title = titleRef.current?.textContent;
    console.log(title);

    const authResponse = await client.query({ query: IS_AUTH });

    if (!authResponse.data.isAuth.isAuth) {
      alert('auth failed');
      return router.push('/admin/login');
    }

    const { data } = await deleteCategory({
      variables: {
        title
      }
    });

    const isDeleted = data.deleteCategory.isDeleted;

    if (isDeleted) {
      alert('deleted successfully');
      return router.reload();
    } else {
      alert('cannot delete!');
      return router.reload();
    }
  }

  function saveEditing(index: number) {}

  function checkEditing() {}

  return (
    <AdminPageLayout>
      <>
        <Container>
          {categories.map((category, index) => {
            if (index === editingCategoryId) {
              return (
                <CategoryContainer key={category.title}>
                  <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
                    <Content>
                      <PreviewTextWrapper>
                        <Input type={'text'} themeMode={themeMode} defaultValue={category.title} />
                        <Input type={'text'} themeMode={themeMode} defaultValue={category.description} />
                      </PreviewTextWrapper>
                      <PreviewImage src={category.previewImage} alt='preview image' />
                    </Content>
                  </BorderBox>
                  {/* <ButtonContainer>
                    <Button
                      themeMode={themeMode}
                      onClick={() => {
                        editCategory(index);
                      }}
                    >
                      Edit
                    </Button>
                    <Button themeMode={themeMode} danger onClick={() => setIsModalOpen(true)}>
                      Delete
                    </Button>
                  </ButtonContainer> */}
                </CategoryContainer>
              );
            } else {
              return (
                <CategoryContainer key={category.title}>
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
                            setIsModalOpen(true);
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
                          <PreviewTitle ref={titleRef}>{category.title}</PreviewTitle>
                          <PreviewContent>{category.description}</PreviewContent>
                        </PreviewTextWrapper>
                        <PreviewImage src={category.previewImage} alt='preview image' />
                      </Content>
                    </div>
                  </BorderBox>
                  {/* <ButtonContainer>
                    <Button
                      themeMode={themeMode}
                      onClick={() => {
                        editCategory(index);
                      }}
                    >
                      Edit
                    </Button>
                    <Button themeMode={themeMode} danger onClick={() => setIsModalOpen(true)}>
                      Delete
                    </Button>
                  </ButtonContainer> */}
                </CategoryContainer>
              );
            }
          })}
        </Container>
        <ModalWrapper visible={isModalOpen}>
          <ModalContainer>
            <ModalParagraph>{'정말 삭제하시겠습니까?\n모든 글도 같이 삭제됩니다.'}</ModalParagraph>
            <ModalButtonContainer>
              <ModalButton
                onClick={() => {
                  setIsModalOpen(false);
                  handleDeleteCategory();
                }}
                themeMode={themeMode}
              >
                예
              </ModalButton>
              <ModalButton onClick={() => setIsModalOpen(false)}>아니요</ModalButton>
            </ModalButtonContainer>
          </ModalContainer>
        </ModalWrapper>
      </>
    </AdminPageLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const client = initApolloClient({}, context);
  const { data } = await client.query({ query: GET_CATEGORY });

  const categories = data.categories;

  return {
    props: {
      categories
    }
  };
}
