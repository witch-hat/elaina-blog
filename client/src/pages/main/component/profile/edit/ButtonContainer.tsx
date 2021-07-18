import React from 'react';
import styled from 'styled-components';

import { Lang, trans } from 'src/resources/languages';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  marginTop: '.5rem',
  justifyContent: 'center'
});

const Button = styled.button<{ isSubmit?: boolean }>((props) => ({
  display: 'flex',
  width: '47.5%',
  padding: '.5rem',
  marginRight: props.isSubmit ? '5%' : '0',
  borderRadius: '.5rem',
  backgroundColor: props.isSubmit ? props.theme.submitButton.buttonColor : 'inherit',
  cursor: 'pointer',
  justifyContent: 'center',
  color: props.isSubmit ? props.theme.submitButton.textColor : 'inherit',
  userSelect: 'none',
  '@media screen and (max-width: 767px)': {
    maxWidth: '150px'
  }
}));

interface Props {
  setEditModeFalse: () => void;
}

export function ButtonContainer(props: Props) {
  return (
    <Container>
      <Button form='profile-form' type='submit' isSubmit={true}>
        {trans(Lang.Save)}
      </Button>
      <Button
        onClick={() => {
          props.setEditModeFalse();
        }}
      >
        {trans(Lang.Cancel)}
      </Button>
    </Container>
  );
}

export const MemoizedButtonContainer = React.memo(ButtonContainer);
