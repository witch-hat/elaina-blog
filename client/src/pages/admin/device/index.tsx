import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import { trans, Lang } from 'src/resources/languages';

import { AdminPageLayout } from '../component/AdminPageLayout';
import { PageTitle } from '../component/PageTitle';

const Container = styled.div({
  width: '100%'
});

interface ServerSideProps {}

interface Props extends ServerSideProps {}

export default function DevicePage(props: Props) {
  return (
    <AdminPageLayout>
      <Container>
        <PageTitle title={trans(Lang.DeviceManage)} />
        <div>Login Device Management</div>
      </Container>
    </AdminPageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  return {
    props: {}
  };
};
