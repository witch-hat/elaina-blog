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

interface Props {
  onClickMenuItem: () => void;
}

export function ContentMenuContainer(props: Props) {
  return (
    <Container>
      <SideMenuTitle icon={faBookmark} title={trans(Lang.Content)} />
      <SideMenuItem menu={trans(Lang.AdminHome)} href='/admin' onClick={props.onClickMenuItem} />
      <SideMenuItem menu={trans(Lang.CategoryManage)} href='/admin/category' onClick={props.onClickMenuItem} />
      <SideMenuItem menu={trans(Lang.BoardManage)} href='/admin/posts' onClick={props.onClickMenuItem} />
    </Container>
  );
}
