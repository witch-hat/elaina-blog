import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { RoundImage, InputBox } from 'src/components';
import { ProfileImageCropper } from './ProfileImageCropper';
import { mockUpData } from 'src/resources';
import { theme } from 'src/styles';
import { ThemeMode } from 'src/redux/common/type';

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
    width: '28%',
    minWidth: '230px',
    maxWidth: '300px'
  },
  '@media screen and (max-width: 767px)': {
    width: '100%',
    minHeight: 'max-content',
    marginBottom: '50px',
    maxWidth: '100%'
  }
});

const Name = styled.span({
  display: 'block',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  width: '100%',
  margin: '15px 0',
  wordBreak: 'keep-all',
  '@media screen and (max-width: 767px)': {
    margin: '10px 0',
    textAlign: 'center'
  }
});

const ListWrapper = styled.ul({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '& > li:first-child': {
    margin: '0 0 .7rem',
    '@media screen and (max-width: 767px)': {
      textAlign: 'center'
    }
  }
});

const Description = styled.li({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  fontSize: '1.1rem',
  wordBreak: 'keep-all',
  margin: '.7rem 0'
});

const ButtonContainer = styled.div({
  width: '100%',
  marginTop: '.5rem',
  display: 'flex',
  justifyContent: 'center'
});

const EditButton = styled.div({
  width: '100%',
  padding: '.5rem',
  borderRadius: '12px',
  border: '1px solid #ddd',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  userSelect: 'none',
  '@media screen and (max-width: 767px)': {
    width: '200px'
  }
});

const SaveButton = styled.div<{ themeMode: ThemeMode }>((props) => ({
  width: '47.5%',
  marginRight: '5%',
  padding: '.5rem',
  borderRadius: '12px',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  color: '#f1f2f3',
  userSelect: 'none',
  backgroundColor: theme[props.themeMode].submitButtonColor,
  '@media screen and (max-width: 767px)': {
    maxWidth: '150px'
  }
}));

const CancelButton = styled.div({
  width: '47.5%',
  padding: '.5rem',
  borderRadius: '12px',
  border: '1px solid #ddd',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  userSelect: 'none',
  '@media screen and (max-width: 767px)': {
    maxWidth: '150px'
  }
});

const Input = styled.input<{ themeMode: ThemeMode }>((props) => ({
  display: 'inline-block',
  flexShrink: 0,
  width: 'calc(100% - 1.6rem)',
  height: '2rem',
  fontSize: '1.1rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${theme[props.themeMode].inputBorder}`,
  borderRadius: '8px',
  color: theme[props.themeMode].inputText,
  backgroundColor: theme[props.themeMode].inputBackground
}));

const ChangeImageButton = styled.label<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '4.2rem',
  height: '2rem',
  position: 'absolute',
  bottom: 0,
  left: '10%',
  margin: '0 0 .5rem .5rem',
  padding: '.5rem',
  backgroundColor: theme[props.themeMode].secondaryContentBackground,
  border: '1px solid #222',
  cursor: 'pointer',
  userSelect: 'none',
  borderRadius: '8px'
}));

const FileSelector = styled.input({
  width: '0px',
  height: '0px',
  overflow: 'hidden',
  border: 'none'
});

const Icon = styled.i({
  display: 'inline-flex',
  width: '1.2rem',
  justifyContent: 'flex-start'
});

const Editor = styled.span<{ themeMode: ThemeMode }>((props) => ({
  display: 'block',
  width: '100%',
  borderRadius: '8px',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${theme[props.themeMode].inputBorder}`,
  borderRadius: '8px',
  color: theme[props.themeMode].inputText,
  backgroundColor: theme[props.themeMode].inputBackground,
  '&:empty::before': {
    content: "'Add introduce'",
    color: '#888'
  },
  '&:empty:focus::before': {
    content: "''"
  }
}));

interface Props {
  theme: ThemeMode;
}

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
          src={mockUpData.profile.image}
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
            <ChangeImageButton htmlFor='profile-select' themeMode={props.theme}>
              <i className='fas fa-camera'></i>&nbsp;Edit
            </ChangeImageButton>
            <FileSelector
              type='file'
              id='profile-select'
              ref={selectedImageRef}
              accept='image/x-png,image/gif,image/jpeg'
              onChange={() => {
                // @ts-ignore
                setSelectedImagePath(URL.createObjectURL(selectedImageRef.current.files[0]) || '');
                setIsSelecImage(true);
              }}
            />
          </>
        )}
      </div>
      <Name>{mockUpData.profile.name}</Name>
      <ListWrapper>
        <Description>
          {isEditMode ? (
            <Editor themeMode={props.theme} role='textbox' contentEditable defaultValue={mockUpData.profile.introduce}>
              {mockUpData.profile.introduce}
            </Editor>
          ) : (
            <span>{mockUpData.profile.introduce}</span>
          )}
        </Description>
        <Description>
          <Icon className='fas fa-link'></Icon>&nbsp;
          {isEditMode ? (
            <Input themeMode={props.theme} type='text' defaultValue={mockUpData.profile.link} />
          ) : (
            <a href={mockUpData.profile.link} target='_blank' rel='noopener noreferer nofollow'>
              <span>{mockUpData.profile.link}</span>
            </a>
          )}
        </Description>
        <Description>
          <Icon className='far fa-building'></Icon>&nbsp;
          {isEditMode ? (
            <Input themeMode={props.theme} type='text' defaultValue={mockUpData.profile.company} />
          ) : (
            <span>{mockUpData.profile.company}</span>
          )}
        </Description>
        <Description>
          <Icon className='fas fa-map-marker-alt'></Icon>&nbsp;
          {isEditMode ? (
            <Input themeMode={props.theme} type='text' defaultValue={mockUpData.profile.location} />
          ) : (
            <span>{mockUpData.profile.location}</span>
          )}
        </Description>
        <Description>
          <Icon className='far fa-envelope'></Icon>&nbsp;
          {isEditMode ? (
            <Input themeMode={props.theme} type='text' defaultValue={mockUpData.profile.email} />
          ) : (
            <a href='mailto:'>
              <span>{mockUpData.profile.email}</span>
            </a>
          )}
        </Description>
      </ListWrapper>
      <ButtonContainer>
        {isEditMode ? (
          <>
            <SaveButton themeMode={props.theme} onClick={() => setIsEditMode(false)}>
              Save
            </SaveButton>
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
