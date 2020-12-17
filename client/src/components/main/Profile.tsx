import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import { RoundImage, InputBox } from 'src/components';
import { ProfileImageCropper } from './ProfileImageCropper';
import { theme } from 'src/resources';

const Container = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '300px',
  padding: '10px',
  minHeight: 'calc(90vh - 40px)',
  alignSelf: 'stretch',
  '@media screen and (max-width: 1380px)': {
    width: '28%'
  },
  '@media screen and (max-width: 768px)': {
    width: '100%',
    minHeight: 'max-content',
    marginBottom: '50px'
  }
});

const Name = styled.span({
  display: 'block',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  width: '100%',
  margin: '15px 0',
  wordBreak: 'keep-all',
  '@media screen and (max-width: 768px)': {
    textAlign: 'center'
  }
});

const ListWrapper = styled.ul({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '& > li:nth-child(1)': {
    '@media screen and (max-width: 768px)': {
      textAlign: 'center'
    }
  }
});

const Description = styled.li({
  width: '100%',
  fontSize: '1.1rem',
  wordBreak: 'keep-all',
  margin: '.7rem 0'
});

const ButtonContainer = styled.div({
  width: '100%',
  marginTop: '.5rem',
  display: 'flex'
});

const EditButton = styled.div({
  width: '100%',
  padding: '.5rem',
  borderRadius: '12px',
  border: '1px solid #ddd',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  userSelect: 'none'
});

const SaveButton = styled.div({
  width: '60%',
  marginRight: '5%',
  padding: '.5rem',
  borderRadius: '12px',
  border: '1px solid #ddd',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  userSelect: 'none'
});

const CancelButton = styled.div({
  width: '35%',
  padding: '.5rem',
  borderRadius: '12px',
  border: '1px solid #ddd',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  userSelect: 'none'
});

const Input = styled.input({
  width: '100%',
  fontSize: '1.1rem',
  margin: '10px 0'
});

const ChangeImageButton = styled.label({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2rem',
  height: '2rem',
  position: 'absolute',
  bottom: 0,
  right: 0,
  padding: '.5rem',
  border: '1px solid #eee',
  cursor: 'pointer',
  userSelect: 'none',
  borderRadius: '50%'
});

const FileSelector = styled.input({
  width: '0px',
  height: '0px',
  overflow: 'hidden',
  border: 'none'
});

interface Props {}

export default function Profile(props: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSelectImage, setIsSelecImage] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState('');
  const selectedImageRef = useRef<HTMLInputElement>(null);

  // initialize input value to trigger onChange event when select the same image
  useEffect(() => {
    if (selectedImagePath && selectedImageRef.current) {
      selectedImageRef.current.value = '';
    }
  }, [selectedImagePath]);

  return (
    <Container>
      <div style={{ position: 'relative' }}>
        <RoundImage
          src={'/images/FakeProfile.png'}
          styles={{
            borderRadius: '50%',
            width: '280px',
            height: '280px',
            medium: { width: '100%', height: 'auto' },
            small: { width: '200px', height: 'auto' }
          }}
        />
        {isEditMode && (
          <>
            <ChangeImageButton htmlFor='profile-select'>
              <i className='fas fa-camera'></i>
            </ChangeImageButton>
            <FileSelector
              type='file'
              id='profile-select'
              ref={selectedImageRef}
              accept='image/x-png,image/gif,image/jpeg'
              onChange={() => {
                setSelectedImagePath(selectedImageRef.current?.value || '');
                setIsSelecImage(true);
              }}
            />
          </>
        )}
      </div>
      <Name>Elaina</Name>
      <ListWrapper>
        <Description>Hello My name is Elaina~~~~~~~</Description>
        <Description>
          <i className='fas fa-link'></i>&nbsp;
          <a href='/' target='_blank' rel='noopener noreferer nofollow'>
            Link
          </a>
        </Description>
        <Description>
          <i className='far fa-building'></i>&nbsp;
          <span>Company</span>
        </Description>
        <Description>
          <i className='fas fa-map-marker-alt'></i>&nbsp;
          <span>Location</span>
        </Description>
        <Description>
          <i className='far fa-envelope'></i>&nbsp;
          <a href='mailto:'>Email</a>
        </Description>
      </ListWrapper>
      <ButtonContainer>
        {isEditMode ? (
          <>
            <SaveButton onClick={() => setIsEditMode(false)}>Save</SaveButton>
            <CancelButton onClick={() => setIsEditMode(false)}>Cancel</CancelButton>
          </>
        ) : (
          <EditButton onClick={() => setIsEditMode(true)}>Edit Profile</EditButton>
        )}
      </ButtonContainer>
      <ProfileImageCropper visible={isSelectImage} path={selectedImagePath} offVisible={() => setIsSelecImage(false)} />
    </Container>
  );
}
