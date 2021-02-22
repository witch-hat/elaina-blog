import React, { createContext, useContext } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Layout from 'src/components/Layout';
import { withApollo, initApolloClient } from '../apollo/withApollo';
import { store, persistor } from 'src/redux';
// import { withApollo } from '../apollo/withApollo';
import { isAuth } from './api/isAuth';
import { IS_AUTH } from 'src/query/user';
import setCookie from 'set-cookie-parser';

// Skip Adding FontAwesome CSS
config.autoAddCss = false;

export interface AppCommonProps {
  app: {
    isLogin: boolean;
  };
}

function ElainaBlog({ Component, pageProps, apolloClient, cookies }: any) {
  if (typeof window !== 'undefined') {
    if (cookies[0] && cookies[1]) {
      document.cookie = cookies[0];
      document.cookie = cookies[1];
    }
  }

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
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
      </Provider>
    </ApolloProvider>
  );
}

ElainaBlog.getInitialProps = async (context: AppContext) => {
  const { ctx, Component } = context;
  // const client = initApolloClient({}, ctx);
  // const { data } = await client.query({ query: IS_AUTH });
  // const isLogin = data.isAuth.isAuth;

  const { isAdmin, response } = await isAuth(ctx);

  const combinedCookieHeader = response.headers.get('Set-Cookie');
  const cookies = setCookie.splitCookiesString(combinedCookieHeader || '');

  let pageProps: AppCommonProps = {
    app: {
      isLogin: isAdmin
    }
  };

  if (Component.getInitialProps) {
    Object.assign(pageProps, await Component.getInitialProps(ctx));
  }

  // console.log('pageProps', pageProps);

  return { pageProps, cookies };
};

export default withApollo(ElainaBlog);
