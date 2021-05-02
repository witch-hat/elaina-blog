import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { Header } from 'src/components';
import { GlobalStyles } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';
import { mockUpData } from 'src/resources';
import { AppCommonProps } from 'src/pages/_app';

const Container = styled.main({
  display: 'flex',
  position: 'relative',
  maxWidth: '1300px',
  minHeight: 'calc(100vh - 4rem)',
  padding: '20px 0 0',
  margin: '4rem auto 0',
  '@media screen and (max-width: 1380px)': {
    width: '100%',
    padding: '20px 10px 0'
  }
});

interface Props extends AppCommonProps {
  children: JSX.Element | JSX.Element[];
}

export function Layout(props: Props) {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <>
      <GlobalStyles themeMode={theme} />
      <Header name={mockUpData.blogName} isLogin={props.app.isLogin} />
      <Container>{props.children}</Container>
    </>
  );
}
