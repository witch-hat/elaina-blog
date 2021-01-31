import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import Cookie from 'cookie';

import LogIn from './login';
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
  const cookie = Cookie.parse(req?.headers.cookie || '').token || null;
  if (cookie === null) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login'
      }
    };
  }
  return { props: { cookie } };
}
