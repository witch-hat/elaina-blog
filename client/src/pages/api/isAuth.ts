import { getAccessToken, setAccessToken } from '../../apollo/token';
import { NextPageContext } from 'next';
import Cookies from 'cookie';
import { IncomingMessage } from 'http';
import jwt from 'jsonwebtoken';
import { NormalizedCacheObject, ApolloClient } from '@apollo/client';
import { IS_AUTH } from 'src/query/user';
import { useApollo, initializeApollo } from 'src/apollo/apolloClient';

export async function isAuth() {
  const client = initializeApollo();
  const { data } = await client.query({ query: IS_AUTH });
  console.log(data);

  return data.isAuth.isAuth;
}
