import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { CategoryDetails } from 'src/query/category';

import UnlinkedCategory from './UnlinkedCategory';

const FullWidthLink = styled.a({
  display: 'block',
  width: '100%'
});

interface Props {
  path: string;
  category: CategoryDetails;
}

function LinkedCategory(props: Props) {
  return (
    <Link href={props.path}>
      <FullWidthLink>
        <UnlinkedCategory category={props.category} />
      </FullWidthLink>
    </Link>
  );
}

export default React.memo(LinkedCategory);
