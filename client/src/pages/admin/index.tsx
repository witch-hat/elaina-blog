import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import Cookie from 'cookie';

import LogIn from './login';
import { AdminPageLayout } from './component/AdminPageLayout';

interface Props {
  cookie?: string;
}

export default function Admin(props: Props) {
  const router = useRouter();

  if (props.cookie === null) {
    router.push('admin/login');
  }
  return (
    <AdminPageLayout>
      <div>Admin Page</div>
    </AdminPageLayout>
  );
}

export async function getServerSideProps(ctx: NextPageContext) {
  const cookie = Cookie.parse(ctx.req?.headers.cookie || '').token || null;
  return { props: { cookie } };
}
