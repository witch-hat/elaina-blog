import React, { useEffect } from 'react';
import { NextPageContext } from 'next';
import Cookies from 'cookie';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import { AdminPageLayout } from './component/AdminPageLayout';
import { initializeApollo, useApollo } from '../../apollo/apolloClient';
import { getAccessToken } from 'src/apollo/token';
import { isAuth } from '../api/isAuth';
import { IS_AUTH } from '../../query/user';

interface Props {}

export default function Admin(props: Props) {
  const router = useRouter();

  useEffect(() => {
    isAuth().then((isAdmin) => {
      if (!isAdmin) {
        router.push('admin/login');
      }
    });
  }, []);

  return (
    <AdminPageLayout>
      <div>Admin Page</div>
    </AdminPageLayout>
  );
}
