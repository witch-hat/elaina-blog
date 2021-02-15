import { useMemo } from 'react';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from 'apollo-link-error';
import { setContext } from '@apollo/client/link/context';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import jwt from 'jsonwebtoken';

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

function _createApolloClient(initialState = {}, token: string, userId: string) {
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
    }
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: new InMemoryCache(),
    assumeImmutableResults: true
  });
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: new InMemoryCache(),
    assumeImmutableResults: true
  });
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient: ApolloClient<NormalizedCacheObject> = apolloClient ?? createApolloClient();

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
