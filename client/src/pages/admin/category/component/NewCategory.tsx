import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';

import { ADD_CATEGORY, CategoryDetails } from 'src/query/category';

const Container = styled.div((props) => ({
  display: 'flex',
  width: '600px',
  margin: '0 auto',
  padding: '.5rem',
  borderRadius: '.5rem',
  border: `1px solid ${props.theme.borderColor}`,
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const Input = styled.input((props) => ({
  display: 'inline-block',
  width: '100%',
  height: '2rem',
  marginRight: '.5rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${props.theme.inputBorder}`,
  borderRadius: '.5rem',
  backgroundColor: props.theme.inputBackground,
  fontSize: '1.1rem',
  fontWeight: 'normal',
  color: props.theme.inputText
}));

const MenuContainer = styled.div((props) => ({
  display: 'flex',
  paddingLeft: '.5rem',
  borderLeft: `1px solid ${props.theme.borderColor}`,
  flexDirection: 'row',
  justifyContent: 'flex-end'
}));

const IconWrapper = styled.span((props) => ({
  display: 'flex',
  width: '40px',
  height: '40px',
  padding: '.5rem',
  borderRadius: '.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: props.theme.hoverBackground,
    cursor: 'pointer'
  }
}));

interface Props {
  cancelCreateCategory: () => void;
  setGreenAlert: (msg: string) => void;
  setRedAlert: (err: any) => void;
  setInitAlert: () => void;
  addNewCategory: (category: CategoryDetails) => void;
}

export function NewCategory(props: Props) {
  const [newCategoryTitle, setNewCategoryTitle] = useState('');

  const [addCategory] = useMutation(ADD_CATEGORY);

  const onSave = async () => {
    props.setInitAlert();

    try {
      const { data } = await addCategory({
        variables: {
          title: newCategoryTitle
        }
      });

      const newCategory: CategoryDetails = {
        _id: data.addCategory._id,
        title: data.addCategory.title,
        postCount: 0,
        recentCreatedAt: null,
        order: data.addCategory.order
      };

      props.addNewCategory(newCategory);
      props.setGreenAlert('New category added successfully.');
    } catch (err) {
      props.setRedAlert(err);
    }

    props.cancelCreateCategory();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setNewCategoryTitle(e.target.value);

  return (
    <Container>
      <Input type='text' placeholder='Title' value={newCategoryTitle} onChange={onChange} />
      <MenuContainer>
        <IconWrapper onClick={() => onSave()}>
          <FontAwesomeIcon icon={faSave} style={{ fontSize: '1.25rem' }} />
        </IconWrapper>
        <IconWrapper onClick={() => props.cancelCreateCategory()}>
          <FontAwesomeIcon icon={faTimesCircle} style={{ fontSize: '1.25rem' }} />
        </IconWrapper>
      </MenuContainer>
    </Container>
  );
}
