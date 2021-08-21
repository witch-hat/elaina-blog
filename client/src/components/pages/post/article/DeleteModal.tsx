import React from 'react';
import styled from 'styled-components';

import { ModalWrapper } from 'src/components';

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

const ModalButton = styled.button<{ delete?: boolean }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  marginLeft: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.delete ? props.theme.dangerButton.buttonColor : 'inherit',
  color: props.delete ? props.theme.dangerButton.textColor : 'inherit'
}));

interface Props {
  visible: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export function DeleteModal(props: Props) {
  return (
    <ModalWrapper visible={props.visible}>
      <ModalContainer>
        <ModalParagraph>정말 삭제하시겠습니까?</ModalParagraph>
        <ModalButtonContainer>
          <ModalButton onClick={props.onDelete} delete>
            예
          </ModalButton>
          <ModalButton onClick={props.onCancel}>아니요</ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalWrapper>
  );
}
