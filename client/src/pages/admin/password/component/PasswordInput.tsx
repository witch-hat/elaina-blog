import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { InputBox } from 'src/components';

const InputContainer = styled.div({
  width: '100%',
  padding: '1rem'
});

const Description = styled.p({
  display: 'inline-block',
  marginBottom: '.5rem',
  fontWeight: 'bold'
});

const Flex = styled.div({
  display: 'flex',
  alignItems: 'center'
});

const IconContainer = styled.div<{ isValid: boolean }>((props) => ({
  marginLeft: '.5rem',
  color: props.isValid ? 'green' : 'red'
}));

interface ValidIconProp {
  isValid: boolean;
}

function ValidIcon(props: ValidIconProp) {
  return (
    <IconContainer isValid={props.isValid}>
      <FontAwesomeIcon icon={props.isValid ? faCheck : faExclamationTriangle} />
    </IconContainer>
  );
}

interface Props {
  description: string;
  placeholder: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
  isValid?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, Props>((props: Props, forwardedRef) => {
  return (
    <InputContainer>
      <Description>{props.description}</Description>
      <Flex>
        <InputBox
          ref={forwardedRef}
          type='password'
          minLength={8}
          maxLength={20}
          placeholder={props.placeholder}
          styles={{ width: '400px' }}
          onChange={(e) => props.onChange(e.target.value)}
        />
        {props.isValid !== undefined && <ValidIcon isValid={props.isValid} />}
      </Flex>
    </InputContainer>
  );
});
