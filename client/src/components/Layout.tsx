import styled from 'styled-components';

import { Header } from './header/Header';

const Container = styled.div({
  marginTop: '10vh'
});

interface Props {
  children: JSX.Element | JSX.Element[];
  name: string;
}

export default function Layout(props: Props) {
  return (
    <div>
      <Header name={props.name} />
      <Container>{props.children}</Container>
    </div>
  );
}
