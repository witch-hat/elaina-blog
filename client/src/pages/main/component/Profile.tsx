import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCamera, faEnvelope, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { RoundImage, InputBox, Loading } from 'src/components';
import { ProfileImageCropper } from './ProfileImageCropper';
import { theme } from 'src/styles';
import { useApollo } from 'src/apollo/apolloClient';
import { GET_PROFILE, ProfileType, UPDATE_PROFILE } from 'src/query';

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

const Form = styled.form({
  width: '100%',
  fontSize: '1.1rem'
});

const Editor = styled.textarea<{ themeMode: ThemeMode }>((props) => ({
  display: 'block',
  width: '100%',
  height: '5rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${theme[props.themeMode].inputBorder}`,
  borderRadius: '8px',
  color: theme[props.themeMode].inputText,
  backgroundColor: theme[props.themeMode].inputBackground,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  resize: 'none',
  '&:empty::before': {
    content: "'Add introduce'",
    color: '#888'
  },
  '&:empty:focus::before': {
    content: "''"
  }
}));

const InputContainer = styled.div({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  margin: '.71rem 0'
});

interface ProfileIconProps {
  icon: IconProp;
}

function ProfileIcon(props: ProfileIconProps) {
  return <FontAwesomeIcon icon={props.icon} style={{ marginRight: '8px' }} />;
}

interface Props {
  profile: ProfileType;
  isLogin: boolean;
}

export default function Profile(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSelectImage, setIsSelectImage] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File>();
  const [mutateProfile, setMutateProfile] = useState<ProfileType>(props.profile);
  const [completedProfile, setCompletedProfile] = useState<ProfileType>(props.profile);
  const [updateProfile] = useMutation<{ updateProfile: ProfileType }>(UPDATE_PROFILE, {
    variables: {
      id: mutateProfile._id,
      image: mutateProfile.image,
      introduce: mutateProfile.introduce,
      link: mutateProfile.link,
      company: mutateProfile.company,
      location: mutateProfile.location,
      email: mutateProfile.email
    },
    onCompleted: () => {
      setCompletedProfile(mutateProfile);
      setIsEditMode(false);
    }
  });

  return (
    <Container>
      <div style={{ position: 'relative' }}>
        <RoundImage
          src={completedProfile.image}
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
              <ProfileIcon icon={faCamera} /> Edit
            </ChangeImageButton>
            <FileSelector
              type='file'
              id='profile-select'
              accept='image/x-png,image/jpeg'
              onChange={(e) => {
                if (e.target.files) {
                  setSelectedImageFile(e.target.files[0]);
                  setIsSelectImage(true);
                }
              }}
            />
          </>
        )}
      </div>
      <Name>{mutateProfile.name}</Name>
      {isEditMode ? (
        <Form
          id='profile-form'
          onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (completedProfile !== mutateProfile) {
              updateProfile();
            } else {
              setIsEditMode(false);
            }
          }}
        >
          <Editor
            placeholder='Introduce'
            themeMode={themeMode}
            role='textbox'
            defaultValue={mutateProfile.introduce}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setMutateProfile({ ...mutateProfile, introduce: event.target.value });
            }}
          />
          <InputContainer>
            <ProfileIcon icon={faLink} />
            <Input
              placeholder='Link'
              themeMode={themeMode}
              type='text'
              defaultValue={mutateProfile.link}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMutateProfile({ ...mutateProfile, link: event.target.value });
              }}
            />
          </InputContainer>
          <InputContainer>
            <ProfileIcon icon={faBuilding} />
            <Input
              placeholder='Company'
              themeMode={themeMode}
              type='text'
              defaultValue={mutateProfile.company}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMutateProfile({ ...mutateProfile, company: event.target.value });
              }}
            />
          </InputContainer>
          <InputContainer>
            <ProfileIcon icon={faMapMarkerAlt} />
            <Input
              placeholder='Region'
              themeMode={themeMode}
              type='text'
              defaultValue={mutateProfile.location}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMutateProfile({ ...mutateProfile, location: event.target.value });
              }}
            />
          </InputContainer>
          <InputContainer>
            <ProfileIcon icon={faEnvelope} />
            <Input
              placeholder='Email'
              themeMode={themeMode}
              type='text'
              defaultValue={mutateProfile.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setMutateProfile({ ...mutateProfile, email: event.target.value });
              }}
            />
          </InputContainer>
        </Form>
      ) : (
        <ListWrapper>
          <Description>
            <span>{completedProfile.introduce}</span>
          </Description>
          <Description>
            <ProfileIcon icon={faLink} />
            <a href={completedProfile.link} target='_blank' rel='noopener noreferer nofollow'>
              <span>{completedProfile.link}</span>
            </a>
          </Description>
          <Description>
            <ProfileIcon icon={faBuilding} />
            <span>{completedProfile.company}</span>
          </Description>
          <Description>
            <ProfileIcon icon={faMapMarkerAlt} />
            <span>{completedProfile.location}</span>
          </Description>
          <Description>
            <ProfileIcon icon={faEnvelope} />
            <a href='mailto:'>
              <span>{completedProfile.email}</span>
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
                setMutateProfile({ ...completedProfile });
                setIsEditMode(false);
              }}
            >
              Cancel
            </CancelButton>
          </>
        ) : (
          props.isLogin && <EditButton onClick={() => setIsEditMode(true)}>Edit Profile</EditButton>
        )}
      </ButtonContainer>
      <ProfileImageCropper
        profileId={props.profile._id}
        visible={isSelectImage}
        file={selectedImageFile}
        onSave={(imagePath: string) => {
          console.log(imagePath);
          setCompletedProfile({ ...mutateProfile, image: imagePath });
          setIsSelectImage(false);
        }}
        onCancel={() => {
          setIsSelectImage(false);
        }}
      />
    </Container>
  );
}
