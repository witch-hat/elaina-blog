import React from 'react';
import styled from 'styled-components';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

import { Lang, trans } from 'src/resources/languages';

import { SideMenuTitle } from './SideMenuTitle';
import { SideMenuItem } from './SideMenuItem';

const Container = styled.div({
  width: '100%',
  marginTop: '1rem'
});

export function ContentMenuContainer() {
  return (
    <Container>
      <SideMenuTitle icon={faBookmark} title={trans(Lang.Content)} />
      <SideMenuItem menu={trans(Lang.AdminHome)} href='/admin' />
      <SideMenuItem menu={trans(Lang.CategoryManage)} href='/admin/category' />
      <SideMenuItem menu={trans(Lang.BoardManage)} href='/admin/posts' />
      <SideMenuItem menu={trans(Lang.TempPosts)} href='/admin/temp' />
    </Container>
  );
}
