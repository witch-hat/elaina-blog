import React, { useState } from 'react';

import { ContentCategory } from 'src/pages/main/component';
import { MainPageLayout } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

export default function Main() {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <MainPageLayout>
      <ContentCategory theme={theme} />
    </MainPageLayout>
  );
}
