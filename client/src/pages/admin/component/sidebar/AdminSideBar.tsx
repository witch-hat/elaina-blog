import React, { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Lang, trans } from 'src/resources/languages';

import { ContentMenuContainer } from './ContentMenuContainer';
import { SettingMenuContainer } from './SettingMenuContainer';

const Container = styled.div({
  width: '100%'
});

const Button = styled.button({
  width: '100%',
  padding: '.625rem',
  borderRadius: '.5rem'
});

interface Props {}

export function AdminSideBar(props: Props) {
  const router = useRouter();

  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);

  return (
    <Container>
      <Button onClick={() => router.push('/admin/writer')}>{trans(Lang.Write)}</Button>
      <ContentMenuContainer />
      <SettingMenuContainer setIsChangePasswordModalOpen={setIsChangePasswordModalOpen} />
    </Container>
  );
}
