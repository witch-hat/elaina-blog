import React, { createContext, useContext } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import Cookie from 'cookie';
import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { getAccessToken, setAccessToken } from '../apollo/token';
import jwt from 'jsonwebtoken';
import Layout from 'src/components/Layout';
import { initializeApollo, useApollo } from 'src/apollo/apolloClient';
import { withApollo } from '../apollo/withApollo';
import { store, persistor } from 'src/redux';
// import { withApollo } from '../apollo/withApollo';
import { isAuth } from './api/isAuth';
import { IS_AUTH } from 'src/query/user';

// Skip Adding FontAwesome CSS
config.autoAddCss = false;

export interface AppCommonProps {
  app: {
    isLogin: boolean;
  };
}

export default function ElainaBlog({ Component, pageProps }: AppProps) {
  const apolloClient = initializeApollo({});
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <PersistGate loading={null} persistor={persistor}>
          <Head>
            <meta charSet='utf-8' />
            {/* <link rel='icon' href='%PUBLIC_URL%/favicon.ico' /> */}
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta name='theme-color' content='#000000' />
            <meta name='description' content='Elaina Blog Theme' />
            {/* <link rel='apple-touch-icon' href='%PUBLIC_URL%/logo192.png' /> */}
            {/* <link rel='manifest' href='%PUBLIC_URL%/manifest.json' /> */}
            <link rel='preconnect' href='https://fonts.gstatic.com' />
            <link href='https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap' rel='stylesheet' />
            <title>Elaina Blog</title>
          </Head>
          <Layout {...pageProps}>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </ApolloProvider>
    </Provider>
  );
}

ElainaBlog.getInitialProps = async (context: AppContext) => {
  const { ctx, Component } = context;

  let pageProps: AppCommonProps = {
    app: {
      isLogin: true
    }
  };

  if (Component.getInitialProps) {
    Object.assign(pageProps, await Component.getInitialProps(ctx));
  }

  // console.log('pageProps', pageProps);

  return { pageProps };
};
