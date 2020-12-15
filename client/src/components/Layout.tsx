import styled from 'styled-components';

import { GlobalStyles, Header, Footer } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div({
  display: 'flex',
  maxWidth: '1200px',
  margin: '5rem auto 0',
  padding: '20px 0 0',
  minHeight: '90vh',
  position: 'relative',
  '@media screen and (max-width: 1280px)': {
    width: '100%',
    padding: '20px 10px 0'
  }
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
      <Footer />
    </div>
  );
}
