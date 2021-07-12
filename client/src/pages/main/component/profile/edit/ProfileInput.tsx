import React from 'react';
import styled from 'styled-components';

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
  defaultValue: string;
  changeEditingProfile: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function ProfileInput(props: Props) {
  return <Input placeholder={props.placeholder} type='text' value={props.defaultValue} onChange={props.changeEditingProfile} />;
}

export const MemoizedProfileInput = React.memo(ProfileInput);
