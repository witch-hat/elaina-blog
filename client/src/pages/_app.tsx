import React from 'react';
import styled from 'styled-components';
import type { AppProps } from 'next/app';
import Head from 'next/head';

import { Header, GlobalStyles } from 'components';
import Layout from 'components/Layout';

export default function ElainaBlog({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Head>
        <meta charSet='utf-8' />
        <link rel='icon' href='%PUBLIC_URL%/favicon.ico' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='theme-color' content='#000000' />
        <meta name='description' content='Elaina Blog Theme' />
        <link rel='apple-touch-icon' href='%PUBLIC_URL%/logo192.png' />
        <link rel='manifest' href='%PUBLIC_URL%/manifest.json' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Nanum+Gothic&display=swap' rel='stylesheet' />
        <link
          rel='stylesheet'
          href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css'
          integrity='sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA=='
          crossOrigin='anonymous'
        />
        <title>Elaina Blog</title>
      </Head>
      <Layout name='ElainaBlog'>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
