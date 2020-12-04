import React from 'react';
import styled from 'styled-components';
import type { AppProps } from 'next/app';

import { Header, GlobalStyles } from 'components';
import Layout from 'components/Layout';

export default function ElainaBlog({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles />
      <Layout name='ElainaBlog'>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
