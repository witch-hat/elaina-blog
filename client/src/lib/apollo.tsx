import { useMemo } from 'react';
import merge from 'deepmerge';
import type { GetServerSidePropsContext, NextPageContext } from 'next';
import type { AppProps } from 'next/app';
import { createUploadLink } from 'apollo-upload-client';
import { ApolloClient, InMemoryCache, ApolloLink, NormalizedCacheObject } from '@apollo/client';
import { onError } from 'apollo-link-error';

export const APOLLO_STATE_PROPERTY_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject>;

const createApolloClient = (ctx: GetServerSidePropsContext | NextPageContext | null) => {
  const enhancedFetch = async (url: string, init: any) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        cookie: ctx?.req?.headers.cookie || '',
        'user-agent': ctx?.req?.headers['user-agent']
      }
    }).then((response) => {
      return response;
    });
  };

  const uploadLink = createUploadLink({
    uri: 'http://localhost:4000/graphql',
    credentials: 'include',
    fetch: enhancedFetch,
    fetchOptions: {
      credentials: 'same-origin'
    }
  });

  const errorLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message));
  });

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    // @ts-ignore
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: new InMemoryCache(),
    assumeImmutableResults: true,
    credentials: 'include'
  });
};

export function initializeApollo(initialState: NormalizedCacheObject = {}, ctx: GetServerSidePropsContext | NextPageContext | null = null) {
  const client = apolloClient ?? createApolloClient(ctx);

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = client.extract();

    // Merge the existing cache into data passed from
    // getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    client.cache.restore(data);
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') {
    return client;
  }

  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = client;
  }

  return client;
}

export function addApolloState(client: ApolloClient<NormalizedCacheObject>, pageProps: AppProps['pageProps']) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROPERTY_NAME] = client.cache.extract();
  }

  return pageProps;
}

export function useApollo(pageProps: AppProps['pageProps']) {
  const state = pageProps[APOLLO_STATE_PROPERTY_NAME];
  const store = useMemo(() => initializeApollo(state), [state]);

  return store;
}
