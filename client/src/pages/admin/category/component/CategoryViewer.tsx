import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPen, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';

import { BorderBox, AlertStateType } from 'src/components';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { CircleRippleWrapper } from 'src/components/common/wrapper/CircleRippleWrapper';
import { CategoryDetails, GET_CATEGORY, ORDER_CATEGORY, UPDATE_CATEGORY } from 'src/query/category';

const Container = styled.div({
  display: 'flex',
  width: '100%',
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

interface Props {
  categories: CategoryDetails[];
  category: CategoryDetails;
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
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [orderCategory] = useMutation(ORDER_CATEGORY);

  function onDragStart(e: React.DragEvent<HTMLDivElement>) {
    props.setGrabbedElement(e.currentTarget);
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
    let grabPosition = Number(props.grabbedElement?.dataset.position);
    let dropPosition = Number(e.currentTarget.dataset.position);

    try {
      const newCategories = [...props.categories];
      newCategories[grabPosition] = newCategories.splice(dropPosition, 1, newCategories[grabPosition])[0];

      props.setAlertState(props.initAlertState);

      orderCategory({
        variables: {
          ids: newCategories.map((category) => category._id)
        }
      });
      props.setCategories(newCategories);
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
  }

  return (
    <Container
      key={props.category.title}
      data-position={props.index}
      draggable={props.grabbingCategoryIndex === props.index}
      onDragOver={(e: React.DragEvent<HTMLDivElement>) => onDragOver(e)}
      onDragStart={(e: React.DragEvent<HTMLDivElement>) => props.grabbingCategoryIndex > -1 && onDragStart(e)}
      onDragEnd={(e: React.DragEvent<HTMLDivElement>) => props.grabbingCategoryIndex > -1 && onDragEnd(e)}
      onDrop={(e: React.DragEvent<HTMLDivElement>) => props.grabbingCategoryIndex > -1 && onDrop(e)}
    >
      <BorderBox isTransform={false} styles={{ width: '100%', margin: '.8rem 0' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', padding: '4px 8px 0px 8px' }}>
            <CircleRippleWrapper
              onClick={() => {
                props.setEditingCategoryIndex(props.index);
              }}
            >
              <FontAwesomeIcon icon={faPen} style={{ fontSize: '1.25rem' }} />
            </CircleRippleWrapper>
            {props.category._id > 0 && (
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
          </div>
          <Content>
            <PreviewTextWrapper>
              <PreviewTitle>{props.category.title}</PreviewTitle>
              <PreviewContent>{props.category.description}</PreviewContent>
            </PreviewTextWrapper>
            <PreviewImage src={props.category.previewImage} alt='preview image' />
          </Content>
        </div>
      </BorderBox>
    </Container>
  );
}
