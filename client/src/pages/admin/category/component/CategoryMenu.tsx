import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPen, faTrash, faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import { CategoryDetails, UPDATE_CATEGORY } from 'src/query/category';

const MenuContainer = styled.div((props) => ({
  display: 'flex',
  paddingLeft: '.5rem',
  borderLeft: `1px solid ${props.theme.borderColor}`,
  flexDirection: 'row',
  justifyContent: 'flex-end'
}));

const IconWrapper = styled.span<{ drag?: boolean }>((props) => ({
  display: 'flex',
  width: '40px',
  height: '40px',
  padding: '.5rem',
  borderRadius: '.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: props.theme.hoverBackground,
    cursor: props.drag ? 'move' : 'pointer'
  }
}));

interface Props {
  isEdit: boolean;
  id: number;
  title: string;
  isDefault: boolean;
  index: number;
  enterEditMode: () => void;
  endEditMode: () => void;
  backupTitle: () => void;
  grabElement: (index: number) => void;
  releaseElement: () => void;
  setGreenAlert: (msg: string) => void;
  setRedAlert: (err: any) => void;
  openDeleteModal: (index: number) => void;
}

export function CategoryMenu(props: Props) {
  const [updateCategory] = useMutation(UPDATE_CATEGORY);

  const onSaveClick = useCallback(async () => {
    if (!props.title) {
      alert('제목을 입력해주세요.');
      return;
    }

    await updateCategory({
      variables: {
        id: props.id,
        title: props.title
      }
    });

    props.setGreenAlert('Update category successfully.');

    try {
    } catch (err) {
      props.setRedAlert(err);
    }

    props.endEditMode();
  }, [props.title]);

  if (props.isEdit) {
    return (
      <MenuContainer>
        <IconWrapper onClick={() => onSaveClick()}>
          <FontAwesomeIcon icon={faSave} style={{ fontSize: '1.25rem' }} />
        </IconWrapper>
        <IconWrapper
          onClick={() => {
            props.backupTitle();
            props.endEditMode();
          }}
        >
          <FontAwesomeIcon icon={faTimesCircle} style={{ fontSize: '1.25rem' }} />
        </IconWrapper>
      </MenuContainer>
    );
  }

  return (
    <MenuContainer>
      <IconWrapper onClick={() => props.enterEditMode()}>
        <FontAwesomeIcon icon={faPen} style={{ fontSize: '1.25rem' }} />
      </IconWrapper>
      {!props.isDefault && (
        <IconWrapper onClick={() => props.openDeleteModal(props.index)}>
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: '1.25rem' }} />
        </IconWrapper>
      )}
      <IconWrapper
        drag
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.button === 0) {
            props.grabElement(props.index);
          } else {
            props.releaseElement();
          }
        }}
        onMouseUp={() => props.releaseElement()}
        onTouchStart={() => props.grabElement(props.index)}
        onTouchEnd={() => props.releaseElement()}
      >
        <FontAwesomeIcon icon={faGripVertical} style={{ fontSize: '1.25rem' }} />
      </IconWrapper>
    </MenuContainer>
  );
}
