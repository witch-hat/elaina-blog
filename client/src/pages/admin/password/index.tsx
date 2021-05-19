import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { AlertStateType, initAlert, AlertBox } from 'src/components';
import { AppCommonProps } from 'src/pages/_app';

import { AdminPageLayout } from '../component/AdminPageLayout';
import { UPDATE_PASSWORD } from 'src/query/user';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import PasswordInput from './component/PasswordInput';

const Container = styled.div({
  width: '100%',
  padding: '1rem 0'
});

const Title = styled.title({
  display: 'block',
  fontSize: '1.5rem',
  fontWeight: 'bold'
});

const StyledHr = styled.hr({
  width: '100%',
  margin: '1rem 0',
  border: 'none',
  borderBottom: '1px solid #666'
});

const ButtonContainer = styled.div({
  padding: '1rem'
});

const SubmitButton = styled.button({
  padding: '.5rem',
  borderRadius: '.5rem'
});

const ForgotPassword = styled.p({
  marginTop: '.25rem',
  fontSize: '.9rem',
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline'
  }
});

interface ServerSideProps {}

interface Props extends AppCommonProps {}

export default function ChangePassword(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const newPasswordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');

  const [alertState, setAlertState] = useState<AlertStateType>(initAlert);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [changePassword] = useMutation(UPDATE_PASSWORD, {
    variables: {
      old: currentPassword,
      new: newPassword,
      confirm: confirmPassword
    }
  });

  useEffect(() => {
    if (newPassword.match(newPasswordRegex) === null) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  }, [newPassword]);

  useEffect(() => {
    if (confirmPassword.length > 8) {
      if (newPassword === confirmPassword) {
        setIsConfirmed(true);
      } else {
        setIsConfirmed(false);
      }
    } else {
      setIsConfirmed(false);
    }
  }, [confirmPassword]);

  async function handleSubmitClick() {
    // check new password
    if (!isConfirmed) {
      alert('New password is not same');
      return;
    }

    if (newPassword.match(newPasswordRegex) === null) {
      alert('Password: aphabet, number, special character with 8~20 length');
      return;
    }

    try {
      setAlertState(initAlert);
      await changePassword();

      setAlertState({
        isPop: true,
        isError: false,
        msg: 'Successfully change password'
      });

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setAlertState({
        isPop: true,
        isError: true,
        msg: err.message
      });
    }
  }

  return (
    <AdminPageLayout>
      <Container>
        <Title>Change Password</Title>
        <StyledHr />
        <PasswordInput
          description='Current Password'
          placeholder='Current password'
          value={currentPassword}
          onChange={(e) => {
            e.preventDefault();
            setCurrentPassword(e.target.value);
          }}
        />
        <PasswordInput
          description='New Password'
          placeholder='New password'
          value={newPassword}
          onChange={(e) => {
            e.preventDefault();
            setNewPassword(e.target.value);
          }}
          isValid={newPassword.length ? isValidPassword : undefined}
        />
        <PasswordInput
          description='Confirm New Password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => {
            e.preventDefault();
            setConfirmPassword(e.target.value);
          }}
          isValid={confirmPassword.length ? isConfirmed : undefined}
        />
        <ButtonContainer>
          <SubmitButton onClick={() => handleSubmitClick()}>Change Password</SubmitButton>
          <ForgotPassword>Forgot password?</ForgotPassword>
        </ButtonContainer>
        {alertState.isPop && (
          <AlertBox msg={alertState.msg} isError={alertState.isError} onCloseButtonClick={() => setAlertState(initAlert)}></AlertBox>
        )}
      </Container>
    </AdminPageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  return {
    props: {}
  };
};
