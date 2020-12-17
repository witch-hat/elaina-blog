import React from 'react';
import styled from 'styled-components';

import { ModalWrapper } from 'src/components';

const Container = styled.div({
  maxWidth: '95%',
  maxHeight: '60%',
  padding: '1rem'
});

const SelectedImage = styled.img({});

const ButtonContainer = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  alignItems: 'center',
  '& > div:first-child': {
    marginRight: '.5rem'
  }
});

const Button = styled.div({
  padding: '.5rem',
  width: '7rem',
  cursor: 'pointer',
  border: '1px solid #ddd',
  textAlign: 'center',
  borderRadius: '12px'
});

interface Props {
  visible: boolean;
  path: string;
  offVisible: Function;
}

export function ProfileImageCropper(props: Props) {
  console.log(props.path);

  return (
    <ModalWrapper visible={props.visible}>
      <Container>
        <SelectedImage src={props.path} alt={props.path} />
        <ButtonContainer>
          <Button onClick={() => props.offVisible()}>Save</Button>
          <Button onClick={() => props.offVisible()}>Cancel</Button>
        </ButtonContainer>
      </Container>
    </ModalWrapper>
  );
}
