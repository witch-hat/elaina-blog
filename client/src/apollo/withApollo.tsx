import React from 'react';
import Head from 'next/head';
import { ApolloClient, NormalizedCacheObject, ApolloLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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
  const WithApollo = ({ apolloClient, apolloState, ...pageProps }: WithApolloArgs) => {
    const client = apolloClient || initApolloClient(apolloState);
    return <PageComponent {...pageProps} apolloClient={client} />;
  };

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async (ctx: NextPageContext) => {
      const { AppTree, req, res } = ctx;

      const apolloClient = initApolloClient({});
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
        apolloState
      };
    };
  }

  return WithApollo;
}

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

export function initApolloClient(initialState: NormalizedCacheObject) {
  if (isServer()) {
    return createApolloClient(initialState);
  }

  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

function createApolloClient(initialState: NormalizedCacheObject = {}) {
  const uploadLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    fetchOptions: {
      credentials: 'include'
    }
  });

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
  });

  // const authLink = setContext((_request, { headers }) => {
  //   console.log('auth link', headers);
  //   return {
  //     headers: {
  //       ...headers,
  //       authorization: token ? `Bearer ${token}` : ''
  //     }
  //   };
  // });

  // const refreshLink = new TokenRefreshLink({
  //   accessTokenField: 'accessToken',

  //   isTokenValidOrUndefined: () => {
  //     const token = getAccessToken();
  //     console.log('isTokenValidOrUndefined', token);

  //     if (!token) {
  //       return true;
  //     }

  //     try {
  //       const decodedToken: any = jwt.decode(getAccessToken());
  //       if (Date.now() > decodedToken.exp * 1000) {
  //         return false;
  //       } else {
  //         return true;
  //       }
  //     } catch {
  //       return false;
  //     }
  //   },

  //   fetchAccessToken: async () => {
  //     console.log('fetching');
  //     return fetch('http://localhost:4000/refresh_token', {
  //       method: 'POST',
  //       credentials: 'include'
  //     });
  //   },

  //   handleFetch: (newToken: any) => {
  //     console.log('new', newToken);
  //     setAccessToken(newToken);
  //   },

  //   handleError: (error) => {
  //     console.error('Cannot refresh access token', error);
  //   }
  // });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: new InMemoryCache().restore(initialState),
    connectToDevTools: true
  });
}
