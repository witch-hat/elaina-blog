import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NextPageContext } from 'next';

import { BorderBox } from 'src/components';
import { mockUpData } from 'src/resources';
import { AdminPageLayout } from '../component/AdminPageLayout';
import { theme } from 'src/styles';
import { GET_CATEGORIES_WITH_DETAILS, CategoryDetails } from 'src/query/category';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { initApolloClient } from 'src/apollo/withApollo';
import { AppCommonProps } from 'src/pages/_app';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
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

interface Props extends AppCommonProps {
  categories: CategoryDetails[];
}

export default function Category(props: Props) {
  const [editingCategoryId, setEditingCategoryId] = useState<number>(-1);
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  console.log(props.categories);

  function deleteCategory() {}

  function editCategory(index: number) {
    if (editingCategoryId === index) {
      setEditingCategoryId(-1);
    } else {
      setEditingCategoryId(index);
    }
  }

  function saveEditing(index: number) {}

  function checkEditing() {}

  return (
    <AdminPageLayout>
      <Container>
        {props.categories.map((category, index) => {
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
                <ButtonContainer>
                  <Button
                    themeMode={themeMode}
                    onClick={() => {
                      editCategory(index);
                    }}
                  >
                    Edit
                  </Button>
                  <Button themeMode={themeMode} danger>
                    Delete
                  </Button>
                </ButtonContainer>
              </CategoryContainer>
            );
          } else {
            return (
              <CategoryContainer key={category.title}>
                <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '4px 8px 0px 8px' }}>
                      <CircleRippleWrapper
                        onClick={() => {
                          console.log('HERE');
                        }}
                      >
                        <FontAwesomeIcon icon={faPen} style={{ fontSize: '1.25rem' }} />
                      </CircleRippleWrapper>
                      <CircleRippleWrapper
                        onClick={() => {
                          console.log('HERE');
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
                <ButtonContainer>
                  <Button
                    themeMode={themeMode}
                    onClick={() => {
                      editCategory(index);
                    }}
                  >
                    Edit
                  </Button>
                  <Button themeMode={themeMode} danger>
                    Delete
                  </Button>
                </ButtonContainer>
              </CategoryContainer>
            );
          }
        })}
      </Container>
    </AdminPageLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const apolloClient = initApolloClient({}, context);
  const categoryQueryResult = await apolloClient.query({ query: GET_CATEGORIES_WITH_DETAILS });

  const categories: CategoryDetails[] = categoryQueryResult.data.categoriesWithDetails;
  return {
    props: {
      categories
    }
  };
}
