import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCamera, faEnvelope, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { RoundImage, AlertStateType, Loading } from 'src/components';
import { theme } from 'src/styles';
import { ProfileType, UPDATE_PROFILE } from 'src/query/profile';
import { Lang, trans } from 'src/resources/languages';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { FileType, UPLOAD_FILE } from 'src/query/file';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';

import { ProfileImageCropper } from './ProfileImageCropper';

const ImageContainer = styled.div({
  display: 'flex',
  poisition: 'relative',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
});

const ChangeImageButton = styled.label<{ themeMode: ThemeMode }>((props) => ({
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
  backgroundColor: theme[props.themeMode].secondaryContentBackground,
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

const Form = styled.form({
  width: '100%',
  fontSize: '1.1rem'
});

const InputContainer = styled.div({
  display: 'flex',
  width: '100%',
  margin: '.71rem 0',
  alignItems: 'center'
});

const Input = styled.input<{ themeMode: ThemeMode }>((props) => ({
  display: 'inline-block',
  width: '100%',
  height: '2rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${theme[props.themeMode].inputBorder}`,
  borderRadius: '.5rem',
  backgroundColor: theme[props.themeMode].inputBackground,
  fontSize: '1.0rem',
  fontWeight: 'normal',
  color: theme[props.themeMode].inputText
}));

const Editor = styled.textarea<{ themeMode: ThemeMode }>((props) => ({
  display: 'block',
  width: '100%',
  height: '5rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${theme[props.themeMode].inputBorder}`,
  borderRadius: '.5rem',
  backgroundColor: theme[props.themeMode].inputBackground,
  color: theme[props.themeMode].inputText,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontSize: '1.0rem',
  resize: 'none',
  '&:empty::before': {
    content: "'Add introduce'",
    color: '#888'
  },
  '&:empty:focus::before': {
    content: "''"
  }
}));

const ButtonContainer = styled.div({
  display: 'flex',
  width: '100%',
  marginTop: '.5rem',
  justifyContent: 'center'
});

const Button = styled.button<{ themeMode: ThemeMode; isSubmit?: boolean }>((props) => ({
  display: 'flex',
  width: '47.5%',
  padding: '.5rem',
  marginRight: props.isSubmit ? '5%' : '0',
  borderRadius: '.5rem',
  backgroundColor: props.isSubmit ? theme[props.themeMode].submitButtonColor : 'inherit',
  cursor: 'pointer',
  justifyContent: 'center',
  color: props.isSubmit ? '#f1f2f3' : theme[props.themeMode].mainText,
  userSelect: 'none',
  '@media screen and (max-width: 767px)': {
    maxWidth: '150px'
  }
}));

interface ProfileIconProps {
  icon: IconProp;
}

function ProfileIcon(props: ProfileIconProps) {
  return <FontAwesomeIcon icon={props.icon} style={{ marginRight: '8px' }} />;
}

interface Props {
  profile: ProfileType;
  alertState: AlertStateType;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  setAlertState: React.Dispatch<React.SetStateAction<AlertStateType>>;
  updateProfile: (profile: ProfileType) => void;
}

export function ProfileEditForm(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [isSelectImage, setIsSelectImage] = useState(false);
  const [croppedImageFile, setCroppedImageFile] = useState<Blob>();
  const [selectedImageFile, setSelectedImageFile] = useState<File>();
  const [editingProfile, setEditingProfile] = useState<ProfileType>(props.profile);

  const client = useApollo();
  const [uploadFile] = useMutation<{ uploadFile: FileType }>(UPLOAD_FILE);
  const [updateProfile, { loading: updateLoading }] = useMutation<{ updateProfile: ProfileType }>(UPDATE_PROFILE);

  function selectImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      if (file) {
        setSelectedImageFile(file);
        setIsSelectImage(true);
      }
    }
    e.target.value = '';
  }

  async function changeProfile() {
    let uploadedImagePath: string | undefined;
    const { data } = await client.query({ query: IS_AUTH });

    const isAdmin = data.isAuth.isAuth;

    if (!isAdmin) {
      props.setAlertState({
        msg: 'Login Invalid: Please login',
        isPop: true,
        isError: true
      });
      props.setEditMode(false);
      return;
    }

    try {
      if (editingProfile.image !== props.profile.image) {
        const uploadResponse = await uploadFile({
          variables: {
            file: croppedImageFile
          }
        });

        uploadedImagePath = uploadResponse.data?.uploadFile.path || '';
      }
    } catch (err) {
      alert(err.message);
    }

    try {
      const { data } = await updateProfile({
        variables: {
          id: editingProfile._id,
          image: uploadedImagePath ? uploadedImagePath : props.profile.image,
          name: editingProfile.name,
          introduce: editingProfile.introduce,
          link: editingProfile.link,
          company: editingProfile.company,
          location: editingProfile.location,
          email: editingProfile.email
        }
      });

      props.updateProfile(data?.updateProfile!);
      props.setEditMode(false);
      props.setAlertState({
        msg: 'Profile changed successfully',
        isPop: true,
        isError: false
      });
    } catch (err) {
      props.setAlertState({
        msg: err.message,
        isPop: true,
        isError: true
      });
      props.setEditMode(false);
      setEditingProfile(props.profile);
    }
  }

  if (updateLoading) {
    return <Loading />;
  }

  return (
    <>
      <ImageContainer>
        <RoundImage
          src={editingProfile.image}
          alt='Profile Image'
          styles={{
            borderRadius: '50%',
            width: '280px',
            height: '280px',
            medium: { width: '100%', height: '100%' },
            small: { width: '200px', height: '200px' }
          }}
        />
        <ChangeImageButton htmlFor='profile-select' themeMode={themeMode}>
          <ProfileIcon icon={faCamera} />
          Edit
        </ChangeImageButton>
        <FileSelector type='file' id='profile-select' accept='image/x-png,image/jpeg' onChange={(e) => selectImage(e)} />
      </ImageContainer>
      <Form
        id='profile-form'
        onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (props.profile !== editingProfile) {
            await changeProfile();
          } else {
            props.setEditMode(false);
          }
        }}
      >
        <InputContainer>
          <Input
            placeholder='Username'
            themeMode={themeMode}
            type='text'
            defaultValue={editingProfile.name}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditingProfile({ ...editingProfile, name: event.target.value });
            }}
          />
        </InputContainer>
        <Editor
          placeholder='Introduce'
          themeMode={themeMode}
          role='textbox'
          defaultValue={editingProfile.introduce}
          onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setEditingProfile({ ...editingProfile, introduce: event.target.value });
          }}
        />
        <InputContainer>
          <ProfileIcon icon={faLink} />
          <Input
            placeholder='Link'
            themeMode={themeMode}
            type='text'
            defaultValue={editingProfile.link}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditingProfile({ ...editingProfile, link: event.target.value });
            }}
          />
        </InputContainer>
        <InputContainer>
          <ProfileIcon icon={faBuilding} />
          <Input
            placeholder='Company'
            themeMode={themeMode}
            type='text'
            defaultValue={editingProfile.company}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditingProfile({ ...editingProfile, company: event.target.value });
            }}
          />
        </InputContainer>
        <InputContainer>
          <ProfileIcon icon={faMapMarkerAlt} />
          <Input
            placeholder='Region'
            themeMode={themeMode}
            type='text'
            defaultValue={editingProfile.location}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditingProfile({ ...editingProfile, location: event.target.value });
            }}
          />
        </InputContainer>
        <InputContainer>
          <ProfileIcon icon={faEnvelope} />
          <Input
            placeholder='Email'
            themeMode={themeMode}
            type='text'
            defaultValue={editingProfile.email}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setEditingProfile({ ...editingProfile, email: event.target.value });
            }}
          />
        </InputContainer>
      </Form>
      <ButtonContainer>
        <Button themeMode={themeMode} form='profile-form' type='submit' isSubmit={true}>
          {trans(Lang.Save)}
        </Button>
        <Button
          themeMode={themeMode}
          onClick={() => {
            props.setEditMode(false);
          }}
        >
          {trans(Lang.Cancel)}
        </Button>
      </ButtonContainer>
      <ProfileImageCropper
        visible={isSelectImage}
        imageFile={selectedImageFile as File}
        onSave={(croppedImage: Blob) => {
          setCroppedImageFile(croppedImage);
          setEditingProfile({ ...editingProfile, image: URL.createObjectURL(croppedImage) });
          setIsSelectImage(false);
        }}
        onCancel={() => {
          setIsSelectImage(false);
        }}
      />
    </>
  );
}
