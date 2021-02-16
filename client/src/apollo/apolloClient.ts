import { useMemo } from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject, createHttpLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { getAccessToken, setAccessToken } from './token';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwt from 'jsonwebtoken';

let apolloClient: ApolloClient<NormalizedCacheObject>;
const isServer = () => typeof window === 'undefined';

function createApolloClient(initialState: NormalizedCacheObject = {}, accessToken: string = '') {
  const uploadLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include'
  });

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
  });

  const authLink = new ApolloLink((operation, forward) => {
    const token = isServer() ? accessToken : getAccessToken();
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    });

    return forward(operation);
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: 'accessToken',

    isTokenValidOrUndefined: () => {
      if (!getAccessToken()) {
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
      return fetch('http://localhost:4000/refresh_token', {
        method: 'POST',
        credentials: 'include'
      });
    },

    handleFetch: (newToken: any) => {
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
    assumeImmutableResults: true,
    connectToDevTools: true
  });
}

export function initializeApollo(initialState: any, accessToken: string = '') {
  const _apolloClient: ApolloClient<NormalizedCacheObject> = apolloClient ?? createApolloClient(initialState);

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === 'undefined') {
    return _apolloClient;
  }
  if (!apolloClient) {
    apolloClient = _apolloClient;
  }
  return _apolloClient;
}

export function useApollo(initialState: any = null) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
