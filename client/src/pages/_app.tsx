import React, { createContext, useContext } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import type { AppContext, AppProps } from 'next/app';
import Head from 'next/head';
import Cookie from 'cookie';
import { ApolloProvider } from '@apollo/client';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import { getAccessToken } from '../apollo/token';
import jwt from 'jsonwebtoken';
import Layout from 'src/components/Layout';
import { useApollo } from 'src/apollo/apolloClient';
import { store, persistor } from 'src/redux';

// Skip Adding FontAwesome CSS
config.autoAddCss = false;

export interface AppCommonProps {
  app: {
    isLogin: boolean;
  };
}

export default function ElainaBlog({ Component, pageProps }: AppProps) {
  const client = useApollo(pageProps.initialApolloState);
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
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

  let isLogin: boolean;
  const decodedAccessToken: any = jwt.decode(Cookie.parse(ctx.req?.headers.cookie || '')['a_access']);
  console.log(decodedAccessToken);

  if (decodedAccessToken) {
    isLogin = decodedAccessToken.exp * 1000 > Date.now();
  } else {
    isLogin = false;
  }

  let pageProps: AppCommonProps = {
    app: {
      isLogin
    }
  };

  if (Component.getInitialProps) {
    Object.assign(pageProps, await Component.getInitialProps(ctx));
  }

  console.log('pageProps', pageProps);

  return { pageProps };
};

// export default withApollo(ElainaBlog);
