import React from 'react';
import { NextPageContext } from 'next';

import { AdminPageLayout } from './component/AdminPageLayout';
import { AppCommonProps, appCommponProps } from '../_app';

interface Props extends AppCommonProps {}

export default function Admin(props: Props) {
  return (
    <AdminPageLayout>
      <div>Admin Page</div>
    </AdminPageLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
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
}
