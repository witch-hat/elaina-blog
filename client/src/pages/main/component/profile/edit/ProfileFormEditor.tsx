import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { ProfileType } from 'src/query/profile';

import { MemoizedProfileInput } from './ProfileInput';

const Form = styled.form({
  width: '100%',
  fontSize: '1.1rem'
});

const InputContainer = styled.div({
  display: 'flex',
  width: '100%',
  margin: '.71rem 0',
  alignItems: 'center'
});

const Editor = styled.textarea((props) => ({
  display: 'block',
  width: '100%',
  height: '5rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${props.theme.inputBorder}`,
  borderRadius: '.5rem',
  backgroundColor: props.theme.inputBackground,
  color: props.theme.inputText,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  fontSize: '1.0rem',
  resize: 'none',
  '&:empty::before': {
    content: "'Add introduce'",
    color: '#888'
  },
  '&:empty:focus::before': {
    content: "''"
  }
}));

const Icon = styled.div({
  display: 'flex',
  width: '2rem',
  alignItems: 'center',
  justifyContent: 'center'
});

interface Props {
  profile: ProfileType;
  editingProfile: ProfileType;
  updateEditingProfile: (profileProperty: string) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => Promise<void>;
  setEditModeFalse: () => void;
  onChangeIntroduce: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function ProfileFormEditor(props: Props) {
  return (
    <Form
      id='profile-form'
      onSubmit={async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (props.profile !== props.editingProfile) {
          await props.handleSubmit();
        } else {
          props.setEditModeFalse();
        }
      }}
    >
      <InputContainer>
        <MemoizedProfileInput
          placeholder='Username'
          defaultValue={props.editingProfile.name || ''}
          changeEditingProfile={props.updateEditingProfile('name')}
        />
      </InputContainer>
      <Editor
        placeholder='Introduce'
        role='textbox'
        value={props.editingProfile.introduce}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => props.onChangeIntroduce(e)}
      />
      <InputContainer>
        <Icon>
          <FontAwesomeIcon icon={faLink} />
        </Icon>
        <MemoizedProfileInput
          placeholder='Link'
          defaultValue={props.editingProfile.link || ''}
          changeEditingProfile={props.updateEditingProfile('link')}
        />
      </InputContainer>
      <InputContainer>
        <Icon>
          <FontAwesomeIcon icon={faBuilding} />
        </Icon>
        <MemoizedProfileInput
          placeholder='Company'
          defaultValue={props.editingProfile.company || ''}
          changeEditingProfile={props.updateEditingProfile('company')}
        />
      </InputContainer>
      <InputContainer>
        <Icon>
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </Icon>
        <MemoizedProfileInput
          placeholder='Location'
          defaultValue={props.editingProfile.location || ''}
          changeEditingProfile={props.updateEditingProfile('location')}
        />
      </InputContainer>
      <InputContainer>
        <Icon>
          <FontAwesomeIcon icon={faEnvelope} />
        </Icon>
        <MemoizedProfileInput
          placeholder='Email'
          defaultValue={props.editingProfile.email || ''}
          changeEditingProfile={props.updateEditingProfile('email')}
        />
      </InputContainer>
    </Form>
  );
}

export const MemoizedProfileFormEditor = React.memo(ProfileFormEditor);
