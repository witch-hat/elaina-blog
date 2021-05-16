import React from 'react';
import styled from 'styled-components';
import { GetServerSideProps } from 'next';

import { AppCommonProps } from 'src/pages/_app';
import { AdminPageLayout } from '../component/AdminPageLayout';

const Container = styled.div({
  width: '100%'
});

interface ServerSideProps {}

interface Props extends AppCommonProps {}

export default function ChangePassword(props: Props) {
  return (
    <AdminPageLayout>
      <Container>
        <div>Change Password</div>
      </Container>
    </AdminPageLayout>
  );
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  return {
    props: {}
  };
};
