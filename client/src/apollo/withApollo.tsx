import { useMemo } from 'react';
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwt from 'jsonwebtoken';

import { useAuth } from '../pages/api/AuthProfvider';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
  headers: {
    Authorization: `Bearer {token}`
  }
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
});

function createHOCApolloClient(initialState: {}, token: any, userId: any, setAuthToken: any) {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }));

  const refreshLink = new TokenRefreshLink({
    accessTokenField: 'newToken',

    isTokenValidOrUndefined: () => {
      if (!userId) {
        return true;
      }

      if (token) {
        const decodedToken: any = jwt.decode(token);
        if (decodedToken.exp * 1000 > Date.now()) return true;
      }
      return false;
    },

    fetchAccessToken: async () => {
      if (!userId) {
        return null;
      }

      const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          query: `
            mutation {
              refreshUserToken(userId: "${userId}") {
                userId
                token
              }
            }
          `
        })
      });

      return response.json();
    },

    handleFetch: (newToken: any) => {
      setAuthToken(newToken);
    },

    handleResponse: (operation, accessTokenFeild) => (response: any) => {
      if (!response) return { newToken: null };
      return { newToken: response.data?.refreshUserToken?.token };
    },

    handleError: (error) => {
      console.error('Cannot refresh access token', error);
    }
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([errorLink, uploadLink, authLink.concat(refreshLink)]),
    cache: new InMemoryCache(),
    assumeImmutableResults: true
  });
}

export function withApollo(PageComponent: any) {
  const WithApollo = ({ apolloClient, apolloState, pageProps }: any) => {
    const { authState, setToken } = useAuth();

    const client = apolloClient || createHOCApolloClient(apolloState, authState.token, authState.userId, setToken);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };
  return WithApollo;
}
