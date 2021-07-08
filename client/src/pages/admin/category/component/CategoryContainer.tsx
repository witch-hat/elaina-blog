import React, { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { AlertBox, AlertStateType } from 'src/components';
import { CategoryDetails } from 'src/query/category';

import { AddCategoryModal } from './AddCategoryModal';
import { DeleteCategoryModal } from './DeleteCategoryModal';
import { CategoryViewer } from './CategoryViewer';

const Container = styled.div({});

const AddCategory = styled.button((props) => ({
  display: 'flex',
  width: '600px',
  margin: '0 auto',
  padding: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.theme.submitButton.buttonColor,
  color: props.theme.submitButton.textColor,
  alignItems: 'center',
  justifyContent: 'center'
}));

interface Props {
  categories: CategoryDetails[];
  isAddModalOpen: boolean;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CategoryContainer(props: Props) {
  const initAlertState: AlertStateType = { msg: '', isPop: false, isError: false };

  const [categories, setCategories] = useState<CategoryDetails[]>(props.categories);
  const [alertState, setAlertState] = useState<AlertStateType>(initAlertState);
  const [grabbingCategoryIndex, setGrabbingCategoryIndex] = useState<number>(-1);
  const [deletedCategory, setDeletedCategory] = useState<{ isModalOpen: boolean; index?: number }>({ isModalOpen: false });

  const grabElement = useCallback((index: number) => {
    setGrabbingCategoryIndex(index);
  }, []);

  const releaseElement = useCallback(() => setGrabbingCategoryIndex(-1), []);

  const setInitAlert = useCallback(() => setAlertState(initAlertState), []);

  const setGreenAlert = useCallback((msg: string) => setAlertState({ msg, isPop: true, isError: false }), []);

  const setRedAlert = useCallback((err: any) => setAlertState({ msg: err.message, isPop: true, isError: true }), []);

  const openDeleteModal = useCallback((index: number) => setDeletedCategory({ isModalOpen: true, index }), []);

  const updateCategories = useCallback((newCategories: CategoryDetails[]) => setCategories(newCategories), []);

  return (
    <Container>
      <Container>
        {categories.map((category, index) => {
          return (
            <CategoryViewer
              key={category.title}
              categories={categories}
              index={index}
              grabbingCategoryIndex={grabbingCategoryIndex}
              initAlertState={initAlertState}
              updateCategories={updateCategories}
              grabElement={grabElement}
              releaseElement={releaseElement}
              setGreenAlert={setGreenAlert}
              setRedAlert={setRedAlert}
              setInitAlert={setInitAlert}
              openDeleteModal={openDeleteModal}
            />
          );
        })}
      </Container>
      <AddCategory>
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: '.5rem' }} />
        <p>Add Category</p>
      </AddCategory>
      <DeleteCategoryModal
        isDeleteModalOpen={deletedCategory.isModalOpen}
        setDeletedCategory={setDeletedCategory}
        index={deletedCategory.index}
        defaultCategoryTitle={categories.filter((category) => category._id === 0)[0].title}
        categories={categories}
        setCategories={setCategories}
        initAlertState={initAlertState}
        setAlertState={setAlertState}
      />
      <AddCategoryModal
        isAddModalOpen={props.isAddModalOpen}
        setIsAddModalOpen={props.setIsAddModalOpen}
        categories={categories}
        setCategories={setCategories}
        initAlertState={initAlertState}
        setAlertState={setAlertState}
      />
      {alertState.isPop && (
        <AlertBox
          isError={alertState.isError}
          msg={alertState.msg}
          onCloseButtonClick={() => {
            setAlertState(initAlertState);
          }}
        />
      )}
    </Container>
  );
}
