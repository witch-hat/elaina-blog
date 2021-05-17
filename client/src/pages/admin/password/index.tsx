import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { InputBox, AlertStateType, initAlert, AlertBox } from 'src/components';
import { AppCommonProps } from 'src/pages/_app';

import { AdminPageLayout } from '../component/AdminPageLayout';
import { UPDATE_PASSWORD } from 'src/query/user';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';

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

const InputContainer = styled.div({
  width: '100%',
  padding: '1rem'
});

const Description = styled.p({
  display: 'inline-block',
  marginBottom: '.5rem',
  fontWeight: 'bold'
});

const ConfirmMsg = styled.p<{ isConfirmed: boolean }>((props) => ({
  display: 'inline-block',
  marginLeft: '.5rem',
  fontSize: '.9rem',
  color: props.isConfirmed ? '#4de350' : 'red'
}));

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

  const [alertState, setAlertState] = useState<AlertStateType>(initAlert);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const currentPasswordInput = useRef<HTMLInputElement>(null);
  const newPasswordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  const [changePassword] = useMutation(UPDATE_PASSWORD, {
    variables: {
      old: currentPassword,
      new: newPassword
    }
  });

  function onChangeConrfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === newPassword) {
      setIsConfirmed(true);
    } else {
      setIsConfirmed(false);
    }
  }

  async function handleSubmitClick() {
    // check new password
    if (!isConfirmed) {
      alert('New password is not same');
      return;
    }

    if (newPassword.length < 8 || newPassword.length > 20) {
      alert('Password length between 8 to 20');
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

      if (currentPasswordInput.current && newPasswordInput.current && confirmPasswordInput.current) {
        currentPasswordInput.current.value = '';
        newPasswordInput.current.value = '';
        confirmPasswordInput.current.value = '';
      }

      setCurrentPassword('');
      setNewPassword('');
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
        <InputContainer>
          <Description>Current Password</Description>
          <div>
            <InputBox
              ref={currentPasswordInput}
              type='password'
              minLength={8}
              maxLength={20}
              placeholder='Current password'
              styles={{ width: '400px' }}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <Description>New Password</Description>
          <div>
            <InputBox
              ref={newPasswordInput}
              type='password'
              minLength={8}
              maxLength={20}
              placeholder='New password'
              styles={{ width: '400px' }}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </InputContainer>
        <InputContainer>
          <Description>Confirm new password</Description>
          {confirmPasswordInput.current?.value.length! >= 4 &&
            (isConfirmed ? (
              <ConfirmMsg isConfirmed={true}>Password is same</ConfirmMsg>
            ) : (
              <ConfirmMsg isConfirmed={false}>Password is not same</ConfirmMsg>
            ))}
          <div>
            <InputBox
              ref={confirmPasswordInput}
              type='password'
              minLength={8}
              maxLength={20}
              placeholder='Confirm new password'
              styles={{ width: '400px' }}
              onChange={(event) => onChangeConrfirmPassword(event)}
            />
          </div>
        </InputContainer>
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
