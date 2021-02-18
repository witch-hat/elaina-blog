import React from 'react';
import { NextPageContext } from 'next';
import Cookies from 'cookie';

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
  let isLogin = Cookies.parse(req?.headers.cookie || '')['a_access'] || null;

  if (!isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login'
      }
    };
  }

  return { props: {} };
}
