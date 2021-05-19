import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { NoRefInputBox } from 'src/components';

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
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isValid?: boolean;
}

function PasswordInput(props: Props) {
  return (
    <InputContainer>
      <Description>{props.description}</Description>
      <Flex>
        <NoRefInputBox
          type='password'
          minLength={8}
          maxLength={20}
          value={props.value}
          placeholder={props.placeholder}
          styles={{ width: '400px' }}
          onChange={(e) => props.onChange(e)}
        />
        {props.isValid !== undefined && <ValidIcon isValid={props.isValid} />}
      </Flex>
    </InputContainer>
  );
}

export default React.memo(PasswordInput, (prev, next) => prev.value === next.value);
