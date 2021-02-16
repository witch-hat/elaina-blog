import React from 'react';
import { NextPageContext } from 'next';
import { getAccessToken } from '../../apollo/token';

import { AdminPageLayout } from './component/AdminPageLayout';

interface Props {}

export default function Admin(props: Props) {
  return (
    <AdminPageLayout>
      <div>Admin Page</div>
    </AdminPageLayout>
  );
}

export async function getServerSideProps({ res, req }: NextPageContext) {
  // const token = getAccessToken();

  let token = true;

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login'
      }
    };
  }

  return { props: {} };
}
