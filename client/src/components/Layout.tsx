import styled from 'styled-components';

import { Header } from './header/Header';

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
  return (
    <div>
      <Header name={props.name} />
      <Container>{props.children}</Container>
    </div>
  );
}
