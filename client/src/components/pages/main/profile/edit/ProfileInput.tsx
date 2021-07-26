import React from 'react';
import styled from 'styled-components';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InputContainer = styled.div({
  display: 'flex',
  width: '100%',
  margin: '.7rem 0',
  alignItems: 'center'
});

const Icon = styled.div({
  display: 'flex',
  width: '2rem',
  alignItems: 'center',
  justifyContent: 'center'
});

const Input = styled.input((props) => ({
  display: 'inline-block',
  width: '100%',
  height: '2rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${props.theme.inputBorder}`,
  borderRadius: '.5rem',
  backgroundColor: props.theme.inputBackground,
  fontSize: '1.0rem',
  fontWeight: 'normal',
  color: props.theme.inputText
}));

interface Props {
  placeholder: string;
  value: string;
  changeEditingProfile: (event: React.ChangeEvent<HTMLInputElement>) => void;
  icon?: IconProp;
}

export function ProfileInput(props: Props) {
  return (
    <InputContainer>
      {props.icon && (
        <Icon>
          <FontAwesomeIcon icon={props.icon} />
        </Icon>
      )}
      <Input placeholder={props.placeholder} type='text' value={props.value} onChange={props.changeEditingProfile} />
    </InputContainer>
  );
}

export const MemoizedProfileInput = React.memo(ProfileInput, (prev, next) => prev.value === next.value);
