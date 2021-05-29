import React, { useState } from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useSelector } from 'react-redux';

import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { AlertStateType, initAlert, AlertBox } from 'src/components';
import { appCommponProps, AppCommonProps } from 'src/pages/_app';
import { trans, Lang } from 'src/resources/languages';

import { AdminPageLayout } from '../component/AdminPageLayout';
import { PassowordInputContainer } from './component/PasswordInputContainer';
import { PageTitle } from '../component/PageTitle';

const Container = styled.div({
  width: '100%'
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
        <PageTitle title={trans(Lang.ChangePassword)} />
        <PassowordInputContainer resetAlert={resetAlert} setSuccessAlert={setSuccessAlert} setErrorAlert={setErrorAlert} />
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
        destination: '/admin/login?url=%2Fadmin%2Fpassword'
      }
    };
  }

  return {
    props: {}
  };
};
