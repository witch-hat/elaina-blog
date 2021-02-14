import 'react-image-crop/dist/ReactCrop.css';

import React, { useEffect, useState } from 'react';
import ReactCrop, { Crop } from 'react-image-crop';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import { ModalWrapper } from 'src/components';
import { FileType, UPLOAD_FILE } from 'src/query/file';
import { ProfileType, UPDATE_PROFILE } from 'src/query';
import { useApollo } from 'src/apollo/apolloClient';

const Container = styled.div({
  width: '500px',
  Height: '300px',
  '@media screen and (max-width: 767px)': {
    width: '100%'
  }
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
  profileId: string;
  visible: boolean;
  file: File | undefined;
  onSave: (imagePath: string) => void;
  onCancel: Function;
}

export function ProfileImageCropper(props: Props) {
  const [crop, setCrop] = useState<Crop>({ aspect: 1 / 1 });
  const [profileImage, setProfileImage] = useState<string>('');
  const [uploadFile] = useMutation<{ uploadFile: FileType }>(UPLOAD_FILE, {});
  const [updateProfile] = useMutation<{ updateProfile: ProfileType }>(UPDATE_PROFILE, {});

  useEffect(() => {
    if (props.file) {
      setProfileImage(URL.createObjectURL(props.file));
      setCrop({ aspect: 1 / 1 });
    }
  }, [props.file]);

  async function changeProfileImage() {
    const response = await uploadFile({
      variables: {
        file: props.file
      }
    });

    if (response.data?.uploadFile.path) {
      const profileResponse = await updateProfile({
        variables: {
          id: props.profileId,
          image: response.data.uploadFile.path
        }
      });

      if (profileResponse.data?.updateProfile?.image) {
        props.onSave(profileResponse.data.updateProfile.image);
      }
    }
  }

  if (props.visible) {
    return (
      <ModalWrapper visible={props.visible}>
        <Container>
          <p style={{ marginBottom: '.3rem' }}>Crop your new profile picture</p>
          <ReactCrop
            src={profileImage}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            imageAlt='edit-profile-image'
            circularCrop={true}
          />
          <ButtonContainer>
            <Button
              onClick={async () => {
                console.log('Crop', crop);
                await changeProfileImage();
              }}
            >
              Save
            </Button>
            <Button onClick={() => props.onCancel()}>Cancel</Button>
          </ButtonContainer>
        </Container>
      </ModalWrapper>
    );
  } else {
    return null;
  }
}
