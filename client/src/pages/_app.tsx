import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { AppContext } from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import Layout from 'src/components/Layout';
import { withApollo, initApolloClient } from '../apollo/withApollo';
import { store, persistor } from 'src/redux';
import { isAuth } from './api/isAuth';
import setCookie from 'set-cookie-parser';

// Skip Adding FontAwesome CSS
config.autoAddCss = false;

export interface AppCommonProps {
  app: {
    isLogin: boolean;
  };
}

const FONT = `
  @font-face {
    font-family: "Nanum Gothic";
    src: url('fonts/Nanum Gothic.woff2') format("woff2");
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: "Nanum Gothic";
    src: url('fonts/Nanum Gothic Bold.woff2') format("woff2");
    font-weight: bold;
    font-style: bold;
  }
`;

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
            <title>Elaina Blog</title>
            <style>{FONT}</style>
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

  const { isAdmin, response } = await isAuth(ctx);

  console.log('app');

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

  return { pageProps, cookies };
};

export default withApollo(ElainaBlog);
