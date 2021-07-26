import React from 'react';
import styled from 'styled-components';

import { NoRefInputBox } from 'src/components';

const Container = styled.div({
  display: 'flex',
  marginRight: '1rem',
  alignItems: 'center',
  '@media screen and (max-width: 400px)': {
    margin: '0 0 .5rem'
  }
});

const Label = styled.label({
  marginRight: '.5rem'
});

interface Props {
  label: string;
  type: string;
  minLength: number;
  maxLength: number;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputContainer(props: Props) {
  return (
    <Container>
      <Label>{props.label}:</Label>
      <NoRefInputBox
        type={props.type}
        maxLength={props.maxLength}
        minLength={props.minLength}
        placeholder={props.placeholder}
        value={props.value}
        styles={{ width: '100px', height: '2rem', small: { width: '100px', height: '2rem' } }}
        onChange={props.onChange}
      />
    </Container>
  );
}

export const MemoizedInputContainer = React.memo(InputContainer);
