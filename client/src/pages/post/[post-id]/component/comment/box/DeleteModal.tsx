import React, { useState } from 'react';
import styled from 'styled-components';

import { ModalWrapper, NoRefInputBox } from 'src/components';

const ModalContainer = styled.div({
  width: '25rem',
  padding: '.5rem'
});

const ModalParagraph = styled.p({
  width: '100%'
});

const Password = styled.div({
  width: '60%',
  margin: '.5rem 0'
});

const ModalButtonContainer = styled.div({
  display: 'flex',
  width: '100%',
  marginTop: '1rem',
  alignItems: 'center',
  justifyContent: 'flex-end'
});

const ModalButton = styled.button<{ danger?: boolean }>((props) => ({
  width: '4.5rem',
  padding: '.5rem',
  marginLeft: '.5rem',
  borderRadius: '.5rem',
  backgroundColor: props.danger ? props.theme.dangerButton.buttonColor : 'inherit',
  color: props.danger ? props.theme.dangerButton.textColor : 'inherit'
}));

interface Props {
  visible: boolean;
  isLogin: boolean;
  onDelete: (password: string) => Promise<void>;
  onCancel: () => void;
}

export function DeleteModal(props: Props) {
  const [password, setPassword] = useState('');

  async function onDelete() {
    await props.onDelete(password);

    setPassword('');
    props.onCancel();
  }

  return (
    <ModalWrapper visible={props.visible}>
      <ModalContainer>
        <ModalParagraph>{props.isLogin ? '정말 삭제하시겠습니까?' : '비밀번호를 입력해주세요'}</ModalParagraph>
        {props.isLogin || (
          <Password>
            <NoRefInputBox
              id='comment-pw-auth'
              type='password'
              placeholder='Password'
              maxLength={20}
              minLength={8}
              styles={{ width: '100%' }}
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Password>
        )}
        <ModalButtonContainer>
          <ModalButton onClick={async () => await onDelete()} danger>
            {props.isLogin ? '예' : '삭제'}
          </ModalButton>
          <ModalButton
            onClick={() => {
              setPassword('');
              props.onCancel();
            }}
          >
            {props.isLogin ? '아니요' : '취소'}
          </ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalWrapper>
  );
}
