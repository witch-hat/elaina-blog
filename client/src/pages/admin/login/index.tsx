import React from 'react';
import styled from 'styled-components';

import { InputBox } from 'src/components';
import { theme } from 'src/styles';

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
  height: '300px',
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

const Label = styled.label({
  display: 'inline-block',
  textAlign: 'left',
  marginBottom: '8px',
  fontWeight: 'bold'
});

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

interface Props {}

export default function Login(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Container>
      <LogInForm>
        <InputWrapper>
          <Label>Email ID</Label>
          <InputBox id='admin-id' type='email' minLength={4} maxLength={100} placeholder='Email ID' styles={{ width: '100%' }} />
        </InputWrapper>
        <InputWrapper>
          <Label>암호</Label>
          <InputBox id='admin-pw' type='password' minLength={4} maxLength={16} placeholder='암호' styles={{ width: '100%' }} />
        </InputWrapper>
        <LogInButton themeMode={themeMode}>
          <LogInText>로그인</LogInText>
        </LogInButton>
        <HelpWrapper></HelpWrapper>
      </LogInForm>
    </Container>
  );
}
