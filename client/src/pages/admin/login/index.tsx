import React, { useRef, useEffect, useState, FormEvent } from 'react';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

import { useApollo } from '../../../apollo/apolloClient';
import { InputBox } from 'src/components';
import { theme } from 'src/styles';
import { GET_USER, User, LOGIN } from 'src/query/user';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 5rem - 20px)',
  alignItems: 'center',
  justifyContent: 'center'
});

const LogInForm = styled.form({
  width: '400px',
  height: '400px',
  padding: '.5rem',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid #ddd',
  borderRadius: '1rem',
  justifyContent: 'center',
  alignItems: 'center'
});

const InputWrapper = styled.div({
  display: 'flex',
  width: '80%',
  flexDirection: 'column',
  margin: '10px 0'
});

const HelpWrapper = styled.div({
  display: 'flex',
  width: '80%',
  flexDirection: 'column',
  margin: '10px 0'
});

const Label = styled.label<{ color?: string; isBold?: boolean }>((props) => {
  return {
    display: 'inline-block',
    textAlign: 'left',
    fontWeight: props.isBold ? 'bold' : 'normal',
    color: props.color ? props.color : ''
  };
});

Label.defaultProps = {
  isBold: false
};

const LogInButton = styled.button<{ themeMode: ThemeMode }>((props) => ({
  width: '85%',
  height: '2.5rem',
  marginTop: '24px',
  borderRadius: '8px',
  backgroundColor: theme[props.themeMode].submitButtonColor,
  color: '#f1f2f3'
}));

const LogInText = styled.span({
  fontWeight: 'bold'
});

const MessageBox = styled.div({
  display: 'flex',
  marginTop: '16px'
});

interface Props {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [userData, setUserData] = useState<User>({});
  const apolloClient = useApollo();
  const [login] = useMutation(LOGIN);
  const router = useRouter();

  // redirect page to login, if login, redirect to admin
  useEffect(() => {
    router.push('/admin/login');
  }, []);

  useEffect(() => {
    (async () => {
      const { data, error } = await apolloClient.query({ query: GET_USER, fetchPolicy: 'network-only' });
      if (error) throw error;
      setUserData(data.me);
    })();
  }, []);

  function controlEnterKey(e: React.KeyboardEvent<HTMLDivElement>, myInputRef: HTMLInputElement, otherInputRef: HTMLInputElement) {
    e.preventDefault();

    const myValueLength: number = myInputRef.value.length;
    const otherValueLength: number = otherInputRef.value.length;

    if (myValueLength !== 0 && otherValueLength === 0) {
      otherInputRef.focus();
    } else if (myValueLength !== 0 && otherValueLength !== 0) {
      buttonRef.current?.click();
    }
  }

  function handleError(message: string) {
    if (passwordInputRef.current) {
      passwordInputRef.current.value = '';
    }
    passwordInputRef.current?.focus();
    setErrorMessage(message);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (emailInputRef.current && passwordInputRef.current) {
      login({
        variables: {
          emailId: emailInputRef.current.value,
          password: passwordInputRef.current.value
        }
      }).catch((err: Error) => handleError(err.message));
    }
  }

  return (
    <Container>
      <LogInForm onSubmit={(event: FormEvent) => handleSubmit(event)}>
        <InputWrapper>
          <Label isBold={true}>Email</Label>
          <InputBox
            inputRef={emailInputRef}
            id='admin-id'
            type='email'
            minLength={4}
            maxLength={100}
            placeholder='Email'
            styles={{ margin: '8px 0 0 0', width: '100%' }}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.nativeEvent.key === 'Enter') {
                if (emailInputRef.current && passwordInputRef.current) {
                  controlEnterKey(e, emailInputRef.current, passwordInputRef.current);
                }
              }
            }}
          />
        </InputWrapper>
        <InputWrapper>
          <Label isBold={true}>암호</Label>
          <InputBox
            inputRef={passwordInputRef}
            id='admin-pw'
            type='password'
            minLength={4}
            maxLength={16}
            placeholder='암호'
            styles={{ margin: '8px 0 0 0', width: '100%' }}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.nativeEvent.key === 'Enter') {
                if (emailInputRef.current && passwordInputRef.current) {
                  controlEnterKey(e, passwordInputRef.current, emailInputRef.current);
                }
              }
            }}
            isValid={errorMessage.length === 0}
          />
        </InputWrapper>
        <MessageBox>
          <Label color={'red'}>{errorMessage}</Label>
        </MessageBox>
        <LogInButton ref={buttonRef} type='submit' themeMode={themeMode}>
          <LogInText>로그인</LogInText>
        </LogInButton>
        <HelpWrapper></HelpWrapper>
      </LogInForm>
    </Container>
  );
}
