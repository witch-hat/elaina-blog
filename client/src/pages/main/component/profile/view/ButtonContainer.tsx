import styled from 'styled-components';

import { Lang, trans } from 'src/resources/languages';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  marginTop: '.5rem',
  justifyContent: 'center'
});

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
