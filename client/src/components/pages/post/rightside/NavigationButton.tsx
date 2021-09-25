import styled from 'styled-components';
import { Heading } from './ContentNavigation';

interface Props {
  heading: Heading;
}

const Container = styled.div({
  display: 'flex'
});

const NavButton = styled.a({
  fontSize: '14px',
  marginTop: '8px'
});

export function ContentNavigationButton(props: Props) {
  const repeat = (Number(props.heading.tag.charAt(1)) - 1) * 2;
  const nbsp = '\xa0'.repeat(repeat);

  return (
    <Container>
      <NavButton href={`#${props.heading.text}`}>
        {nbsp}
        {props.heading.text}
      </NavButton>
    </Container>
  );
}
