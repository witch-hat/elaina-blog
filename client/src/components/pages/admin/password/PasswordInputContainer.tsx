import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';

import { UpdatePasswordQueryType, UpdatePasswordVars, UPDATE_PASSWORD } from 'src/query/user';
import { trans, Lang } from 'src/resources/languages';

import { MemoizedPasswordInputItem } from './PasswordInputItem';

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

interface Passwords {
  current: string;
  new: string;
  confirm: string;
}

interface Props {
  resetAlert: () => void;
  setSuccessAlert: () => void;
  setErrorAlert: (err: Error) => void;
}

export function PassowordInputContainer(props: Props) {
  const newPasswordRegex = new RegExp('^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})');
  const initPasswords: Passwords = { current: '', new: '', confirm: '' };

  const [passwords, setPasswords] = useState<Passwords>(initPasswords);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [changePassword] = useMutation<UpdatePasswordQueryType, UpdatePasswordVars>(UPDATE_PASSWORD, {
    variables: {
      old: passwords.current,
      new: passwords.new,
      confirm: passwords.confirm
    }
  });

  const onCurrentPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, current: e.target.value }));
  }, []);

  const onNewPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, new: e.target.value }));
  }, []);

  const onConfirmPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords((prev) => ({ ...prev, confirm: e.target.value }));
  }, []);

  useEffect(() => {
    if (passwords.new.match(newPasswordRegex) === null) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  }, [passwords.new]);

  useEffect(() => {
    if (passwords.confirm.length >= 8) {
      if (passwords.new === passwords.confirm) {
        setIsConfirmed(true);
      } else {
        setIsConfirmed(false);
      }
    } else {
      setIsConfirmed(false);
    }
  }, [passwords.confirm, passwords.new]);

  async function handleSubmitClick() {
    // check new password
    if (!isConfirmed) {
      alert('New password is not same');
      return;
    }

    if (passwords.new.match(newPasswordRegex) === null) {
      alert('Password: aphabet, number, special character with 8~20 length');
      return;
    }

    try {
      props.resetAlert();
      await changePassword();

      props.setSuccessAlert();
      setPasswords(initPasswords);
    } catch (err) {
      props.setErrorAlert(err);
    }
  }

  return (
    <Container>
      <MemoizedPasswordInputItem
        description={trans(Lang.CurrentPassword)}
        placeholder='Current password'
        value={passwords.current}
        onChange={onCurrentPasswordChange}
      />
      <MemoizedPasswordInputItem
        description={trans(Lang.NewPassword)}
        placeholder='New password'
        value={passwords.new}
        onChange={onNewPasswordChange}
        isValid={passwords.new.length ? isValidPassword : undefined}
      />
      <MemoizedPasswordInputItem
        description={trans(Lang.ConfirmPassword)}
        placeholder='Confirm password'
        value={passwords.confirm}
        onChange={onConfirmPasswordChange}
        isValid={passwords.confirm.length ? isConfirmed : undefined}
      />
      <ButtonContainer>
        <SubmitButton onClick={handleSubmitClick}>{trans(Lang.ChangePassword)}</SubmitButton>
        <ForgotPassword>{trans(Lang.ForgotPassword)}</ForgotPassword>
      </ButtonContainer>
    </Container>
  );
}
