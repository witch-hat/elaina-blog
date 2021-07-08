import React, { useCallback, useRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPen, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { cloneDeep, throttle } from 'lodash';

import { BorderBox, AlertStateType } from 'src/components';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { CategoryDetails, ORDER_CATEGORY, UPDATE_CATEGORY } from 'src/query/category';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  alignItems: 'center'
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

const MenuContainer = styled.div({
  display: 'flex',
  padding: '4px 8px 0px 8px',
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'flex-end'
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

const PreviewTitle = styled.span({
  display: '-webkit-box',
  height: '2rem',
  width: '100%',
  flexShrink: 0,
  fontSize: '1.4rem',
  fontWeight: 'bold',
  textAlign: 'left',
  wordBreak: 'break-all',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '@media screen and (max-width: 1380px)': {
    wordBreak: 'break-all'
  }
});

const PreviewContent = styled.span({
  display: '-webkit-box',
  width: '100%',
  height: '4.5rem',
  margin: '.25rem 0 0',
  flexShrink: 0,
  fontSize: '1.1rem',
  wordBreak: 'keep-all',
  textAlign: 'left',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

const GrabButtonContainer = styled.div({
  '&:hover > *': {
    cursor: 'grab'
  }
});

interface Props {
  categories: CategoryDetails[];
  index: number;
  grabbingCategoryIndex: number;
  grabbedElement: (EventTarget & HTMLDivElement) | null;
  initAlertState: AlertStateType;
  setCategories: React.Dispatch<React.SetStateAction<CategoryDetails[]>>;
  setEditingCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setGrabbingCategoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setDeletedCategory: React.Dispatch<React.SetStateAction<{ isModalOpen: boolean; index?: number | undefined }>>;
  setGrabbedElement: React.Dispatch<React.SetStateAction<(EventTarget & HTMLDivElement) | null>>;
  setAlertState: React.Dispatch<React.SetStateAction<AlertStateType>>;
}

export function CategoryViewer(props: Props) {
  const initialCategoryOrder = useRef<number[] | null>(null);
  const [orderCategory] = useMutation(ORDER_CATEGORY);

  const onDragStart = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    initialCategoryOrder.current = props.categories.map((category) => category._id);
    props.setGrabbingCategoryIndex(Number(e.currentTarget.dataset.position));
    props.setGrabbedElement(e.currentTarget);
  }, []);

  const onDragEnter = useCallback(
    throttle((e: React.DragEvent<HTMLDivElement>) => {
      let dragOverItemPosition = Number(e.currentTarget.dataset.position);
      // props is immutable, splice() change data
      const copiedCategory = cloneDeep(props.categories);

      copiedCategory.splice(props.grabbingCategoryIndex, 1);
      copiedCategory.splice(dragOverItemPosition, 0, props.categories[props.grabbingCategoryIndex]);

      props.setGrabbingCategoryIndex(dragOverItemPosition);
      dragOverItemPosition = -1;
      props.setCategories(copiedCategory);
    }, 400),
    [props.grabbingCategoryIndex, props.categories]
  );

  const onDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      try {
        const changedOrder = props.categories.map((category) => category._id);
        if (initialCategoryOrder.current) {
          if (initialCategoryOrder.current.every((id, index) => id === changedOrder[index])) {
            return;
          }
        }

        props.setAlertState(props.initAlertState);

        await orderCategory({
          variables: {
            ids: changedOrder
          }
        });

        props.setGrabbingCategoryIndex(-1);
      } catch (err) {
        const backUpCategories = [...props.categories];
        props.setCategories(backUpCategories);
        props.setAlertState({
          msg: err.message,
          isPop: true,
          isError: true
        });
      }
    },
    [props.categories]
  );

  return (
    <Container
      data-position={props.index}
      draggable={props.grabbingCategoryIndex === props.index}
      onDragStart={(e) => props.grabbingCategoryIndex > -1 && onDragStart(e)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={(e) => props.grabbingCategoryIndex > -1 && onDragEnter(e)}
      onDrop={(e) => props.grabbingCategoryIndex > -1 && onDrop(e)}
    >
      <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
        <Wrapper>
          <MenuContainer>
            <CircleRippleWrapper
              onClick={() => {
                props.setEditingCategoryIndex(props.index);
              }}
            >
              <FontAwesomeIcon icon={faPen} style={{ fontSize: '1.25rem' }} />
            </CircleRippleWrapper>
            {props.categories[props.index]._id > 0 && (
              <CircleRippleWrapper
                onClick={() => {
                  props.setDeletedCategory({ isModalOpen: true, index: props.index });
                }}
              >
                <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.25rem' }} />
              </CircleRippleWrapper>
            )}
            <GrabButtonContainer
              onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
                if (e.button === 0) {
                  props.setGrabbingCategoryIndex(props.index);
                } else {
                  props.setGrabbingCategoryIndex(-1);
                }
              }}
              onMouseUp={() => {
                props.setGrabbingCategoryIndex(-1);
              }}
              onTouchStart={() => props.setGrabbingCategoryIndex(props.index)}
            >
              <CircleRippleWrapper onClick={() => {}}>
                <FontAwesomeIcon icon={faGripVertical} style={{ fontSize: '1.25rem' }} />
              </CircleRippleWrapper>
            </GrabButtonContainer>
          </MenuContainer>
          <Content>
            <PreviewTextWrapper>
              <PreviewTitle>{props.categories[props.index].title}</PreviewTitle>
              <PreviewContent>{props.categories[props.index].description}</PreviewContent>
            </PreviewTextWrapper>
            <PreviewImage src={props.categories[props.index].previewImage} alt='preview image' />
          </Content>
        </Wrapper>
      </BorderBox>
    </Container>
  );
}
