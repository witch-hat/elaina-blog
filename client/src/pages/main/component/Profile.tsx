import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faCamera, faEnvelope, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { RoundImage, AlertBox } from 'src/components';
import { theme } from 'src/styles';
import { ProfileType, UPDATE_PROFILE } from 'src/query/profile';
import { Lang, trans } from 'src/resources/languages';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { FileType, UPLOAD_FILE } from 'src/query/file';
import { useApollo } from 'src/apollo/apolloClient';
import { IS_AUTH } from 'src/query/user';

import { ProfileImageCropper } from './ProfileImageCropper';

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
  borderRadius: '6px',
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
  borderRadius: '6px',
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
  borderRadius: '6px',
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

const ParagraphLink = styled.a({
  display: 'block',
  width: '100%'
});

const Paragraph = styled.p({
  display: 'block',
  width: '100%',
  overflow: 'hidden',
  wordBreak: 'break-all',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
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

export function Profile(props: Props) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSelectImage, setIsSelectImage] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File>();
  const [croppedImageFile, setCroppedImageFile] = useState<Blob>();
  const [edtingProfile, setEditingProfile] = useState<ProfileType>(props.profile);
  const [viewedProfile, setViewedProfile] = useState<ProfileType>(props.profile);
  const [popAlterBox, setPopAlterBox] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');
  const [isApolloError, setIsApolloError] = useState(false);
  // const [uploadedImagePath, setUploadImagePath] = useState('');

  const client = useApollo();
  const [uploadFile] = useMutation<{ uploadFile: FileType }>(UPLOAD_FILE);
  const [updateProfile] = useMutation<{ updateProfile: ProfileType }>(UPDATE_PROFILE);

  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  async function changeProfile() {
    let uploadedImagePath: string | undefined;
    const { data } = await client.query({ query: IS_AUTH });

    const isAdmin = data.isAuth.isAuth;

    if (!isAdmin) {
      setIsEditMode(false);
      return;
    }

    try {
      if (edtingProfile.image !== viewedProfile.image) {
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
      await updateProfile({
        variables: {
          id: edtingProfile._id,
          image: uploadedImagePath ? uploadedImagePath : viewedProfile.image,
          name: edtingProfile.name,
          introduce: edtingProfile.introduce,
          link: edtingProfile.link,
          company: edtingProfile.company,
          location: edtingProfile.location,
          email: edtingProfile.email
        }
      });

      setViewedProfile({ ...edtingProfile, image: uploadedImagePath ? uploadedImagePath : viewedProfile.image });
      setIsEditMode(false);
      setPopAlterBox(true);
      setAlertMsg('Profile changed successfully');
      setIsApolloError(false);
    } catch (err) {
      setPopAlterBox(true);
      setAlertMsg(err.message);
      setIsApolloError(true);
      setIsEditMode(false);
      setEditingProfile(viewedProfile);
    }
  }

  return (
    <Container>
      <div style={{ position: 'relative' }}>
        <RoundImage
          src={isEditMode ? edtingProfile.image : viewedProfile.image}
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
                  const file = e.target.files[0];
                  if (file) {
                    setSelectedImageFile(file);
                    setIsSelectImage(true);
                  }
                }
              }}
            />
          </>
        )}
      </div>
      {!isEditMode && <Name>{edtingProfile.name}</Name>}
      {isEditMode ? (
        <Form
          id='profile-form'
          onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (viewedProfile !== edtingProfile) {
              await changeProfile();
            } else {
              setIsEditMode(false);
            }
          }}
        >
          <InputContainer>
            <Input
              placeholder='Username'
              themeMode={themeMode}
              type='text'
              defaultValue={edtingProfile.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditingProfile({ ...edtingProfile, name: event.target.value });
              }}
            />
          </InputContainer>
          <Editor
            placeholder='Introduce'
            themeMode={themeMode}
            role='textbox'
            defaultValue={edtingProfile.introduce}
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setEditingProfile({ ...edtingProfile, introduce: event.target.value });
            }}
          />
          <InputContainer>
            <ProfileIcon icon={faLink} />
            <Input
              placeholder='Link'
              themeMode={themeMode}
              type='text'
              defaultValue={edtingProfile.link}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditingProfile({ ...edtingProfile, link: event.target.value });
              }}
            />
          </InputContainer>
          <InputContainer>
            <ProfileIcon icon={faBuilding} />
            <Input
              placeholder='Company'
              themeMode={themeMode}
              type='text'
              defaultValue={edtingProfile.company}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditingProfile({ ...edtingProfile, company: event.target.value });
              }}
            />
          </InputContainer>
          <InputContainer>
            <ProfileIcon icon={faMapMarkerAlt} />
            <Input
              placeholder='Region'
              themeMode={themeMode}
              type='text'
              defaultValue={edtingProfile.location}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditingProfile({ ...edtingProfile, location: event.target.value });
              }}
            />
          </InputContainer>
          <InputContainer>
            <ProfileIcon icon={faEnvelope} />
            <Input
              placeholder='Email'
              themeMode={themeMode}
              type='text'
              defaultValue={edtingProfile.email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setEditingProfile({ ...edtingProfile, email: event.target.value });
              }}
            />
          </InputContainer>
        </Form>
      ) : (
        <ListWrapper>
          <Description>
            <Paragraph>{viewedProfile.introduce}</Paragraph>
          </Description>
          {viewedProfile.link && (
            <Description>
              <ProfileIcon icon={faLink} />
              <ParagraphLink href={viewedProfile.link} target='_blank' rel='noopener noreferer nofollow'>
                <Paragraph>{viewedProfile.link}</Paragraph>
              </ParagraphLink>
            </Description>
          )}
          {viewedProfile.company && (
            <Description>
              <ProfileIcon icon={faBuilding} />
              <Paragraph>{viewedProfile.company}</Paragraph>
            </Description>
          )}
          {viewedProfile.location && (
            <Description>
              <ProfileIcon icon={faMapMarkerAlt} />
              <Paragraph>{viewedProfile.location}</Paragraph>
            </Description>
          )}
          {viewedProfile.email && (
            <Description>
              <ProfileIcon icon={faEnvelope} />
              <ParagraphLink href={`mailto:${viewedProfile.email}`}>
                <Paragraph>{viewedProfile.email}</Paragraph>
              </ParagraphLink>
            </Description>
          )}
        </ListWrapper>
      )}
      <ButtonContainer>
        {isEditMode ? (
          <>
            <SaveButton themeMode={themeMode} form='profile-form' type='submit'>
              {trans(Lang.Save)}
            </SaveButton>
            <CancelButton
              onClick={() => {
                setEditingProfile({ ...viewedProfile });
                setIsEditMode(false);
              }}
            >
              {trans(Lang.Cancel)}
            </CancelButton>
          </>
        ) : (
          props.isLogin && <EditButton onClick={() => setIsEditMode(true)}>{trans(Lang.EditProfile)}</EditButton>
        )}
      </ButtonContainer>
      <ProfileImageCropper
        visible={isSelectImage}
        imageFile={selectedImageFile}
        onSave={(croppedImage: Blob) => {
          setCroppedImageFile(croppedImage);
          setEditingProfile({ ...edtingProfile, image: URL.createObjectURL(croppedImage) });
          setIsSelectImage(false);
        }}
        onCancel={() => {
          setIsSelectImage(false);
        }}
      />
      {popAlterBox && (
        <AlertBox
          isError={isApolloError}
          msg={alertMsg}
          onCloseButtonClick={() => {
            setAlertMsg('');
            setIsApolloError(false);
            setPopAlterBox(false);
          }}
        />
      )}
    </Container>
  );
}
