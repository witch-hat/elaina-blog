import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { AlertStateType, initAlert, AlertBox } from 'src/components';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';

import { AdminPageLayout } from '../component/AdminPageLayout';
import { UPDATE_PASSWORD } from 'src/query/user';
import { MemoPassowordInputContainer } from './component/PasswordInputContainer';

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

interface ServerSideProps {}

interface Props extends AppCommonProps {}

export default function ChangePassword(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  const [alertState, setAlertState] = useState<AlertStateType>(initAlert);

  function resetAlert() {
    setAlertState(initAlert);
  }

  function setSuccessAlert() {
    setAlertState({
      isPop: true,
      isError: false,
      msg: 'Successfully change password'
    });
  }

  function setErrorAlert(err: Error) {
    setAlertState({
      isPop: true,
      isError: true,
      msg: err.message
    });
  }

  return (
    <AdminPageLayout>
      <Container>
        <Title>Change Password</Title>
        <StyledHr />
        <MemoPassowordInputContainer resetAlert={resetAlert} setSuccessAlert={setSuccessAlert} setErrorAlert={setErrorAlert} />
        {alertState.isPop && (
          <AlertBox msg={alertState.msg} isError={alertState.isError} onCloseButtonClick={() => resetAlert()}></AlertBox>
        )}
      </Container>
    </AdminPageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login'
      }
    };
  }

  return {
    props: {}
  };
};
