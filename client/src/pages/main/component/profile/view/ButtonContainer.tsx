import styled, { keyframes, css } from 'styled-components';

import { Lang, trans } from 'src/resources/languages';

const FadeIn = keyframes({
  from: {
    opacity: '0'
  },
  to: {
    opacity: '1'
  }
});

const Container = styled.div(
  {
    display: 'flex',
    width: '100%',
    marginTop: '.5rem',
    justifyContent: 'center',
    opacity: '0'
  },
  css`
    animation: ${FadeIn} 0.4s 1.2s ease-out forwards;
  `
);

const EditButton = styled.div({
  display: 'flex',
  width: '100%',
  padding: '.5rem',
  border: '1px solid #ddd',
  borderRadius: '.5rem',
  justifyContent: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  '@media screen and (max-width: 767px)': {
    width: '200px'
  }
});

interface Props {
  enterEditMode: () => void;
}

export function ButtonContainer(props: Props) {
  return (
    <Container>
      <EditButton onClick={() => props.enterEditMode()}>{trans(Lang.EditProfile)}</EditButton>
    </Container>
  );
}
