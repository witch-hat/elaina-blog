import React, { useRef, useEffect, useState, FormEvent } from 'react';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';

import { useApollo } from '../../../apolloClient';
import { InputBox } from 'src/components';
import { theme } from 'src/styles';
import { GET_USER, User } from 'src/query/user';

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

const Label = styled.label<{ isBold?: boolean }>((props) => {
  return {
    display: 'inline-block',
    textAlign: 'left',
    fontWeight: props.isBold ? 'bold' : 'normal'
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const [userData, setUserData] = useState<User>({});
  const apolloClient = useApollo();

  useEffect(() => {
    (async () => {
      const { data, error } = await apolloClient.query({ query: GET_USER });
      if (error) throw error;
      setUserData(data.user[data.user.length - 1]);
    })();
  }, []);

  console.log(userData);

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

  return (
    <Container>
      <LogInForm
        onSubmit={(event: FormEvent) => {
          event.preventDefault();
          if (emailInputRef.current?.value === userData.emailId) {
            if (passwordInputRef.current?.value) {
              bcrypt.compare(passwordInputRef.current.value, userData.password).then((result) => {
                if (result) {
                  props.setLogin(true);
                } else {
                  alert('fail to login');
                }
              });
            }
          } else {
            alert('fail to login');
          }
        }}
      >
        <InputWrapper>
          <Label isBold={true}>Email ID</Label>
          <InputBox
            inputRef={emailInputRef}
            id='admin-id'
            type='email'
            minLength={4}
            maxLength={100}
            placeholder='Email ID'
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
            minLength={0}
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
          />
        </InputWrapper>
        <MessageBox>
          <Label>입력한 Email ID 또는 암호가 정확하지 않습니다.</Label>
        </MessageBox>
        <LogInButton ref={buttonRef} type='submit' themeMode={themeMode}>
          <LogInText>로그인</LogInText>
        </LogInButton>
        <HelpWrapper></HelpWrapper>
      </LogInForm>
    </Container>
  );
}
