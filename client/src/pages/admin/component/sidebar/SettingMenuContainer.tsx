import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { faUsersCog } from '@fortawesome/free-solid-svg-icons';

import { Lang, trans } from 'src/resources/languages';

import { LOGOUT } from '../../../../query/user';
import { SideMenuTitle } from './SideMenuTitle';
import { SideMenuItem } from './SideMenuItem';

const Container = styled.div({
  width: '100%',
  marginTop: '1rem'
});

interface Props {}

export function SettingMenuContainer(props: Props) {
  const router = useRouter();

  const [logout] = useMutation(LOGOUT);

  return (
    <Container>
      <SideMenuTitle icon={faUsersCog} title={trans(Lang.Setting)} />
      <SideMenuItem menu={trans(Lang.ChangePassword)} href='/admin/password' />
      <SideMenuItem
        menu={trans(Lang.Logout)}
        onClick={() => {
          logout();
          router.push('/admin/login');
        }}
      />
    </Container>
  );
}
