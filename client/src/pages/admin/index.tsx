import React, { useEffect } from 'react';
import { NextPageContext } from 'next';

import { AdminPageLayout } from './component/AdminPageLayout';
import { isAuth } from 'src/pages/api/isAuth';
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
