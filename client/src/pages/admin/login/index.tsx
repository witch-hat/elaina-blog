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

const Wrapper = styled.div({
  display: 'flex',
  margin: '10px 0',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
});

const Label = styled.label({
  width: '2rem',
  display: 'inline-block',
  textAlign: 'center',
  marginRight: '.5rem'
});

const LogInButton = styled.button<{ themeMode: ThemeMode }>((props) => ({
  width: '70px',
  height: '2.5rem',
  borderRadius: '8px',
  backgroundColor: theme[props.themeMode].submitButtonColor,
  color: '#f1f2f3'
}));

interface Props {}

export function LogIn(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Container>
      <LogInForm>
        <Wrapper>
          <Label>ID</Label>
          <InputBox id='admin-id' type='email' minLength={4} maxLength={100} placeholder='Email' styles={{ width: '60%' }} />
        </Wrapper>
        <Wrapper>
          <Label>PW</Label>
          <InputBox id='admin-pw' type='password' minLength={4} maxLength={16} placeholder='PW' styles={{ width: '60%' }} />
        </Wrapper>
        <LogInButton themeMode={themeMode}>Log In</LogInButton>
      </LogInForm>
    </Container>
  );
}
