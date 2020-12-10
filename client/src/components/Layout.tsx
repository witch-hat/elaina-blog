import styled from 'styled-components';

import { Header } from './header/Header';
import { GlobalStyles } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div({
  display: 'flex',
  width: '1300px',
  margin: '10vh auto 0',
  padding: '20px 0',
  minHeight: '90vh',
  position: 'relative'
});

interface Props {
  children: JSX.Element | JSX.Element[];
  name: string;
}

export default function Layout(props: Props) {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <div>
      <GlobalStyles themeMode={theme} />
      <Header name={props.name} theme={theme} />
      <Container>{props.children}</Container>
    </div>
  );
}
