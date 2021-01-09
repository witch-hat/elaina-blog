import React, { useState } from 'react';

import { ContentCategory } from 'src/pages/main/component';
import { MainPageLayout } from 'src/components';

export default function Main() {
  return (
    <MainPageLayout>
      <ContentCategory />
    </MainPageLayout>
  );
}
