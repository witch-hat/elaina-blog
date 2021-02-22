import React, { useEffect } from 'react';
import { NextPageContext } from 'next';

import { AdminPageLayout } from './component/AdminPageLayout';
import { isAuth } from 'src/pages/api/isAuth';

interface Props {}

export default function Admin(props: Props) {
  return (
    <AdminPageLayout>
      <div>Admin Page</div>
    </AdminPageLayout>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { isAdmin } = await isAuth(context);

  if (!isAdmin) {
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
