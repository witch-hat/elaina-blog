import React from 'react';
import styled from 'styled-components';

import { ContentCategoryModifier } from './ContentCategoryModifier';
import { ViewCountAnalyst } from './ViewCountAnalyst';

export function AdminMainPage() {
  return (
    <div>
      <ViewCountAnalyst />
      <ContentCategoryModifier />
    </div>
  );
}
