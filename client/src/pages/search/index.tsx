import React from 'react';
import styled from 'styled-components';

import KeywordFinder from './[keyword]';

export default function Search() {
  return <></>;
}

export function getServerSideProps() {
  return {
    redirect: {
      permanant: false,
      destination: '/'
    }
  };
}
