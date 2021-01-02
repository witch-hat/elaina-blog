import React from 'react';
import styled from 'styled-components';

import { MainPageLayout } from 'src/components';
import { TimeLineEditor } from './component/TimeLineEditor';

const Container = styled.div({
  margin: '2rem 0 0'
});

export default function TimeLine() {
  return (
    <MainPageLayout>
      <Container>
        <TimeLineEditor />
      </Container>
    </MainPageLayout>
  );
}
