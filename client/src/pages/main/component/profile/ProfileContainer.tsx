import React, { useState } from 'react';
import styled from 'styled-components';

import { AlertBox, AlertStateType } from 'src/components';
import { ProfileType } from 'src/query/profile';

import { ProfileEditForm } from './ProfileEditForm';
import { ProfileViewer } from './ProfileViewer';

interface Props {}

const Container = styled.aside({
  display: 'flex',
  width: '300px',
  minHeight: 'calc(90vh - 40px)',
  padding: '0 1rem',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  alignSelf: 'stretch',
  '@media screen and (max-width: 1380px)': {
    width: '28%',
    minWidth: '230px',
    maxWidth: '300px'
  },
  '@media screen and (max-width: 767px)': {
    width: '100%',
    maxWidth: '100%',
    minHeight: 'max-content',
    marginBottom: '50px'
  }
});

interface Props {
  profile: ProfileType;
  isLogin: boolean;
}

export function ProfileContainer(props: Props) {
  const initAlertState: AlertStateType = { msg: '', isPop: false, isError: false };

  const [isEditMode, setIsEditMode] = useState(false);
  const [alertState, setAlertState] = useState<AlertStateType>(initAlertState);

  return (
    <Container>
      {isEditMode ? (
        <ProfileEditForm profile={props.profile} alertState={alertState} setEditMode={setIsEditMode} setAlertState={setAlertState} />
      ) : (
        <ProfileViewer profile={props.profile} isLogin={props.isLogin} setEditMode={setIsEditMode} />
      )}
      {alertState.isPop && (
        <AlertBox
          isError={alertState.isError}
          msg={alertState.msg}
          onCloseButtonClick={() => {
            setAlertState(initAlertState);
          }}
        />
      )}
    </Container>
  );
}
