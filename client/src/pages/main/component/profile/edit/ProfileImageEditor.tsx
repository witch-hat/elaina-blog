import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

import { RoundImage } from 'src/components';

const ImageContainer = styled.div({
  display: 'flex',
  poisition: 'relative',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
});

const ChangeImageButton = styled.label((props) => ({
  display: 'flex',
  position: 'absolute',
  top: '250px',
  left: '10%',
  width: '4.2rem',
  height: '2rem',
  padding: '.5rem',
  margin: '0 0 .5rem .5rem',
  border: '1px solid #222',
  borderRadius: '.5rem',
  backgroundColor: props.theme.secondaryContentBackground,
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  userSelect: 'none'
}));

const FileSelector = styled.input({
  width: '0px',
  height: '0px',
  border: 'none',
  overflow: 'hidden'
});

interface Props {
  image: string;
  selectImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileImageEditor(props: Props) {
  return (
    <ImageContainer>
      <RoundImage
        src={props.image}
        alt='Profile Image'
        styles={{
          borderRadius: '50%',
          width: '280px',
          height: '280px',
          medium: { width: '100%', height: '100%' },
          small: { width: '200px', height: '200px' }
        }}
      />
      <ChangeImageButton htmlFor='profile-select'>
        <FontAwesomeIcon icon={faCamera} style={{ marginRight: '.5rem' }} />
        Edit
      </ChangeImageButton>
      <FileSelector type='file' id='profile-select' accept='image/x-png,image/jpeg' onChange={(e) => props.selectImage(e)} />
    </ImageContainer>
  );
}

export const MemoizedProfileImageEditor = React.memo(ProfileImageEditor);
