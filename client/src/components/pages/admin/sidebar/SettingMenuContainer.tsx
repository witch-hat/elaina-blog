import React from 'react';
import styled from 'styled-components';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';

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

export function SettingMenuContainer(props: Props) {
  return (
    <Container>
      <SideMenuTitle icon={faUsersCog} title={trans(Lang.Setting)} />
      <SideMenuItem menu={trans(Lang.ChangePassword)} href='/admin/password' onClick={props.onClickMenuItem} />
      <SideMenuItem menu={trans(Lang.DeviceManage)} href='/admin/device' onClick={props.onClickMenuItem} />
    </Container>
  );
}
