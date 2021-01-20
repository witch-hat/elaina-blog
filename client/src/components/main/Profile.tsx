import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useMutation } from '@apollo/client';

import { RoundImage, InputBox, Loading, GET_PROFILE, ProfileType, UPDATE_PROFILE } from 'src/components';
import { ProfileImageCropper } from './ProfileImageCropper';
import { theme } from 'src/styles';
import { useApollo } from '../apolloClient';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
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

const SaveButton = styled.button<{ themeMode: ThemeMode }>((props) => ({
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
  width: '100%',
  height: '2rem',
  fontSize: '1.1rem',
  padding: '.2rem',
  outline: 'none',
  fontWeight: 'normal',
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

const Editor = styled.textarea<{ themeMode: ThemeMode }>((props) => ({
  display: 'block',
  width: '100%',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${theme[props.themeMode].inputBorder}`,
  borderRadius: '8px',
  color: theme[props.themeMode].inputText,
  backgroundColor: theme[props.themeMode].inputBackground,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  '&:empty::before': {
    content: "'Add introduce'",
    color: '#888'
  },
  '&:empty:focus::before': {
    content: "''"
  }
}));

interface Props {}

export default function Profile(props: any) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSelectImage, setIsSelecImage] = useState(false);
  const [selectedImagePath, setSelectedImagePath] = useState('');
  const selectedImageRef = useRef<HTMLInputElement>(null);
  const apolloClient = useApollo();
  const [profile, setProfile] = useState<ProfileType>({});
  const [mutateProfile, setMutateProfile] = useState<ProfileType>({});
  // const [updateProfile, { data }] = useMutation(UPDATE_PROFILE, {
  //   update(cache, { data: { updateProfile } }) {
  //     const { profile } = cache.readQuery({ query: GET_PROFILE });
  //     cache.writeQuery({
  //       query: GET_PROFILE,
  //       data: { profile }
  //     });
  //   }
  // });
  const [updateProfile, { data }] = useMutation(UPDATE_PROFILE);

  useEffect(() => {
    (async () => {
      const { loading, data, error } = await apolloClient.query({ query: GET_PROFILE });
      if (loading) return <Loading />;
      if (error) throw error;
      setProfile(data.profile);
      setMutateProfile(data.profile);
    })();
  }, []);

  // initialize input value to trigger onChange event when select the same image
  useEffect(() => {
    if (selectedImagePath && selectedImageRef.current) {
      selectedImageRef.current.value = '';
    }
  }, [selectedImagePath]);

  console.log(profile);

  return (
    <Container>
      <div style={{ position: 'relative' }}>
        <RoundImage
          src={profile.image || ''}
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
            <ChangeImageButton htmlFor='profile-select' themeMode={themeMode}>
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
      {isEditMode || <Name>{profile.name}</Name>}
      {isEditMode ? (
        <form
          id='profile-form'
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            updateProfile({
              variables: {
                image: mutateProfile.image,
                name: mutateProfile.name,
                introduce: mutateProfile.introduce,
                link: mutateProfile.link,
                company: mutateProfile.company,
                location: mutateProfile.location,
                email: mutateProfile.email
              }
            });
          }}
        >
          <Input
            themeMode={themeMode}
            type='text'
            defaultValue={profile.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMutateProfile({ ...mutateProfile, name: event.target.value });
            }}
          />
          <Editor
            themeMode={themeMode}
            role='textbox'
            defaultValue={profile.introduce}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setMutateProfile({ ...mutateProfile, introduce: event.target.value });
            }}
          />
          <Input
            themeMode={themeMode}
            type='text'
            defaultValue={profile.link}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMutateProfile({ ...mutateProfile, link: event.target.value });
            }}
          />
          <Input
            themeMode={themeMode}
            type='text'
            defaultValue={profile.company}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMutateProfile({ ...mutateProfile, company: event.target.value });
            }}
          />
          <Input
            themeMode={themeMode}
            type='text'
            defaultValue={profile.location}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMutateProfile({ ...mutateProfile, location: event.target.value });
            }}
          />
          <Input
            themeMode={themeMode}
            type='text'
            defaultValue={profile.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setMutateProfile({ ...mutateProfile, email: event.target.value });
            }}
          />
        </form>
      ) : (
        <ListWrapper>
          <Description>
            <span>{profile.introduce}</span>
          </Description>
          <Description>
            <Icon className='fas fa-link'></Icon>&nbsp;
            <a href={profile.link} target='_blank' rel='noopener noreferer nofollow'>
              <span>{profile.link}</span>
            </a>
          </Description>
          <Description>
            <Icon className='far fa-building'></Icon>&nbsp;
            <span>{profile.company}</span>
          </Description>
          <Description>
            <Icon className='fas fa-map-marker-alt'></Icon>&nbsp;
            <span>{profile.location}</span>
          </Description>
          <Description>
            <Icon className='far fa-envelope'></Icon>&nbsp;
            <a href='mailto:'>
              <span>{profile.email}</span>
            </a>
          </Description>
        </ListWrapper>
      )}
      <ButtonContainer>
        {isEditMode ? (
          <>
            <SaveButton themeMode={themeMode} form='profile-form' type='submit'>
              Save
            </SaveButton>
            <CancelButton
              onClick={() => {
                setMutateProfile({ ...profile });
                setIsEditMode(false);
              }}
            >
              Cancel
            </CancelButton>
          </>
        ) : (
          <EditButton onClick={() => setIsEditMode(true)}>Edit Profile</EditButton>
        )}
      </ButtonContainer>
      <ProfileImageCropper visible={isSelectImage} path={selectedImagePath} offVisible={() => setIsSelecImage(false)} />
    </Container>
  );
}
