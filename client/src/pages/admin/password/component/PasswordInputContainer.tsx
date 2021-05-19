import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { UPDATE_PASSWORD } from 'src/query/user';

import { MemoPasswordInputItem } from './PasswordInputItem';

const Container = styled.div({
  width: '100%'
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
  userSelect: 'none',
  '&:hover': {
    textDecoration: 'underline'
  }
});

interface Props {
  resetAlert: Function;
  setSuccessAlert: Function;
  setErrorAlert: (err: Error) => void;
}

function PassowordInputContainer(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const newPasswordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');

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

  const onCurrentPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPassword(e.target.value);
    },
    [currentPassword]
  );

  const onNewPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value);
    },
    [newPassword]
  );

  const onConfirmPasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(e.target.value);
    },
    [currentPassword]
  );

  useEffect(() => {
    console.log(newPassword);
    if (newPassword.match(newPasswordRegex) === null) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  }, [newPassword]);

  useEffect(() => {
    if (confirmPassword.length >= 8) {
      if (newPassword === confirmPassword) {
        setIsConfirmed(true);
      } else {
        setIsConfirmed(false);
      }
    } else {
      setIsConfirmed(false);
    }
  }, [confirmPassword, newPassword]);

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
      props.resetAlert();
      await changePassword();

      props.setSuccessAlert();
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      props.setErrorAlert(err);
    }
  }

  return (
    <Container>
      <MemoPasswordInputItem
        description='Current Password'
        placeholder='Current password'
        value={currentPassword}
        onChange={(e) => onCurrentPasswordChange(e)}
      />
      <MemoPasswordInputItem
        description='New Password'
        placeholder='New password'
        value={newPassword}
        onChange={(e) => onNewPasswordChange(e)}
        isValid={newPassword.length ? isValidPassword : undefined}
      />
      <MemoPasswordInputItem
        description='Confirm New Password'
        placeholder='Confirm password'
        value={confirmPassword}
        onChange={(e) => onConfirmPasswordChange(e)}
        isValid={confirmPassword.length ? isConfirmed : undefined}
      />
      <ButtonContainer>
        <SubmitButton onClick={() => handleSubmitClick()}>Change Password</SubmitButton>
        <ForgotPassword>Forgot password?</ForgotPassword>
      </ButtonContainer>
    </Container>
  );
}

export const MemoPassowordInputContainer = React.memo(PassowordInputContainer);
