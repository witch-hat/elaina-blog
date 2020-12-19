import React, { useState } from 'react';
import styled from 'styled-components';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { ModalWrapper } from 'src/components';

const Container = styled.div({
  width: '500px',
  Height: '300px',
  padding: '1rem'
});

const SelectedImage = styled.img({
  width: '100%',
  height: '100%',
  objectFit: 'contain'
});

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
  const [crop, setCrop] = useState<Crop>({ aspect: 1 / 1 });

  return (
    <ModalWrapper visible={props.visible}>
      <Container>
        <ReactCrop src={props.path} crop={crop} onChange={(newCrop) => setCrop(newCrop)} />
        <ButtonContainer>
          <Button onClick={() => props.offVisible()}>Save</Button>
          <Button onClick={() => props.offVisible()}>Cancel</Button>
        </ButtonContainer>
      </Container>
    </ModalWrapper>
  );
}
