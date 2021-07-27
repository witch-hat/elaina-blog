import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import { appCommponProps } from 'src/pages/_app';
import { trans, Lang } from 'src/resources/languages';
import { initApolloClient } from 'src/apollo/withApollo';
import { GetDeviceQueryType, GET_DEVICES, LoginDeviceType } from 'src/query/user';
import { PageTitle, AdminPageLayout, DeviceItem } from 'src/components/pages/admin';

const Container = styled.div({
  width: '100%'
});

const DeviceContainer = styled.div({
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'flex-start'
});

interface ServerSideProps {
  loginDevices: LoginDeviceType[];
}

interface Props extends ServerSideProps {}

export default function DevicePage(props: Props) {
  return (
    <AdminPageLayout>
      <Container>
        <PageTitle title={trans(Lang.DeviceManage)} />
        <DeviceContainer>
          {props.loginDevices.map((device) => {
            return <DeviceItem key={device.userUniqueId} device={device} />;
          })}
        </DeviceContainer>
      </Container>
    </AdminPageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login?url=%2Fadmin%2Fdevice'
      }
    };
  }

  context.res.setHeader('Cache-Control', 'max-age=0, public, must-revalidate');

  const client = initApolloClient({}, context);
  const { data } = await client.query<GetDeviceQueryType>({ query: GET_DEVICES });
  const loginDevices = data.findDevices;

  return {
    props: {
      loginDevices
    }
  };
};
