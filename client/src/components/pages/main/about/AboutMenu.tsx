import React from 'react';
import styled from 'styled-components';

import { MemoizedAboutInfo } from './AboutInfo';

const FlexWrapper = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

interface Props {
  name: string;
  updatedAt: number;
  isLogin: boolean;
}

export function AboutMenu(props: Props) {
  return (
    <FlexWrapper>
      <MemoizedAboutInfo name={props.name} updatedAt={props.updatedAt} />
    </FlexWrapper>
  );
}
