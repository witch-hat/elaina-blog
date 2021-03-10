import React from 'react';
import styled from 'styled-components';

import KeywordFinder from './[keyword]';

export default function Search() {
  return <div></div>;
}

export function getServerSideProps() {
  return {
    redirects: {
      permanant: false,
      href: '/'
    }
  };
}
