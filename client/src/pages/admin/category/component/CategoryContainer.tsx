import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { NextPageContext } from 'next';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPen, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import cloneDeep from 'lodash/cloneDeep';

import { BorderBox, AlertBox, AlertStateType } from 'src/components';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { initApolloClient } from 'src/apollo/withApollo';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { CategoryDetails, GET_CATEGORY, ORDER_CATEGORY, UPDATE_CATEGORY } from 'src/query/category';

import { AddCategoryModal } from './AddCategoryModal';
import { DeleteCategoryModal } from './DeleteCategoryModal';
import { CategoryEditor } from './CategoryEditor';
import { CategoryViewer } from './CategoryViewer';

const Container = styled.div({});

interface Props {
  categories: CategoryDetails[];
  isAddModalOpen: boolean;
  setIsAddModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CategoryContainer(props: Props) {
  const initAlertState: AlertStateType = { msg: '', isPop: false, isError: false };

  const [categories, setCategories] = useState<CategoryDetails[]>(props.categories);
  const [editingCategoryIndex, setEditingCategoryIndex] = useState<number>(-1);
  const [alertState, setAlertState] = useState<AlertStateType>(initAlertState);
  const [grabbingCategoryIndex, setGrabbingCategoryIndex] = useState<number>(-1);
  const [deletedCategory, setDeletedCategory] = useState<{ isModalOpen: boolean; index?: number }>({ isModalOpen: false });
  const [grabbedElement, setGrabbedElement] = useState<(EventTarget & HTMLDivElement) | null>(null);

  return (
    <Container>
      <Container>
        {categories.map((category, index) => {
          if (index === editingCategoryIndex) {
            return (
              <CategoryEditor
                categories={categories}
                index={index}
                initAlertState={initAlertState}
                setAlertState={setAlertState}
                setCategories={setCategories}
                setEditingCategoryIndex={setEditingCategoryIndex}
              />
            );
          } else {
            return (
              <CategoryViewer
                categories={categories}
                index={index}
                grabbingCategoryIndex={grabbingCategoryIndex}
                grabbedElement={grabbedElement}
                initAlertState={initAlertState}
                setCategories={setCategories}
                setEditingCategoryIndex={setEditingCategoryIndex}
                setGrabbingCategoryIndex={setGrabbingCategoryIndex}
                setDeletedCategory={setDeletedCategory}
                setGrabbedElement={setGrabbedElement}
                setAlertState={setAlertState}
              />
            );
          }
        })}
      </Container>
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
