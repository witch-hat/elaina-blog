import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';

import { Lang, trans } from 'src/resources/languages';

import { ContentMenuContainer } from './ContentMenuContainer';
import { SettingMenuContainer } from './SettingMenuContainer';
import { FocusWrapper } from 'src/components';

const Container = styled.aside<{ show: boolean }>((props) => ({
  position: 'sticky',
  top: 'calc(4.5rem + 20px)',
  width: '300px',
  height: 'calc(100vh - 4rem - 20px)',
  '@media screen and (max-width: 1380px)': {
    position: 'fixed',
    top: '4rem',
    left: '0',
    display: props.show ? 'block' : 'none',
    width: '30%',
    height: '100%',
    minWidth: '300px',
    padding: '.5rem',
    backgroundColor: props.theme.secondaryContentBackground,
    zIndex: 1
  }
}));

const Button = styled.button({
  width: '100%',
  padding: '.625rem',
  borderRadius: '.5rem'
});

interface Props {
  visible: boolean;
  closeMenu: () => void;
}

export function AdminSideBar(props: Props) {
  const router = useRouter();

  return (
    <Container show={props.visible}>
      <FocusWrapper visible={props.visible} onClickOutside={props.closeMenu}>
        <>
          <Button onClick={() => router.push('/admin/writer')}>{trans(Lang.Write)}</Button>
          <ContentMenuContainer onClickMenuItem={props.closeMenu} />
          <SettingMenuContainer onClickMenuItem={props.closeMenu} />
        </>
      </FocusWrapper>
    </Container>
  );
}
