import React from 'react';
import Head from 'next/head';
import { ApolloClient, NormalizedCacheObject, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getAccessToken, setAccessToken } from './token';
import { NextPageContext } from 'next';
import Cookies from 'cookie';
import jwt from 'jsonwebtoken';
import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { TokenRefreshLink } from 'apollo-link-token-refresh';

const isServer = () => typeof window === 'undefined';

interface WithApolloArgs {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  serverAccessToken: string;
  apolloState: NormalizedCacheObject;
}

export function withApollo(PageComponent: any, { ssr = true } = {}) {
  const WithApollo = ({ apolloClient, serverAccessToken, apolloState, ...pageProps }: WithApolloArgs) => {
    if (!isServer() && !getAccessToken()) {
      setAccessToken(serverAccessToken);
    }

    const client = apolloClient || initApolloClient(apolloState);
    return <PageComponent {...pageProps} apolloClient={client} />;
  };

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: NextPageContext) => {
      const { AppTree, req, res } = ctx;

      let serverAccessToken = '';

      if (isServer()) {
        const cookies = Cookies.parse(`${req?.headers.cookie}`);
        if (cookies['a_refresh']) {
          const response = await fetch('http://localhost:4000/refresh_token', {
            method: 'POST',
            credentials: 'include',
            headers: {
              cookie: 'a_refresh' + cookies['a_refresh']
            }
          });

          const data = await response.json();
          serverAccessToken = data.accessToken;
        }
      }
      const apolloClient = initApolloClient({}, serverAccessToken);
      const pageProps = PageComponent.getInitialProps ? await PageComponent.getInitialProps(ctx) : {};

      if (typeof window === 'undefined') {
        if (res && res.finished) {
          return {};
        }
        if (ssr) {
          try {
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(<AppTree pageProps={{ ...pageProps, apolloClient }} />);
          } catch (err) {
            console.error('Error from getDataFromTree', err);
          }
        }
        Head.rewind();
      }
      const apolloState = apolloClient?.cache.extract();

      return {
        ...pageProps,
        apolloState,
        serverAccessToken
      };
    };
  }

  return WithApollo;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function initApolloClient(initialState: NormalizedCacheObject, serverAccessToken?: string) {
  if (isServer()) {
    return createApolloClient(initialState, serverAccessToken || '');
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

function createApolloClient(initialState: NormalizedCacheObject = {}, serverAccessToken?: string) {
  const uploadLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
  });

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
  });

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',

    isTokenValidOrUndefined: () => {
      console.log('isTokenValidOrUndefined');
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const decodedToken: any = jwt.decode(getAccessToken());
        if (Date.now() > decodedToken.exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },

    fetchAccessToken: async () => {
      console.log('fetching');
      return fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include'
      });
    },

    handleFetch: (newToken: any) => {
      console.log('new', newToken);
      setAccessToken(newToken);
    },

    handleError: (error) => {
      console.error('Cannot refresh access token', error);
    }
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([refreshLink, errorLink, authLink, uploadLink]),
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: true
  });
}
