import styled from 'styled-components';

const Container = styled.div({
  display: 'flex',
  justifyContent: 'flex-end'
});

const PasswordInput = styled.input({
  padding: '.5rem',
  margin: '.5rem 0 .5rem .5rem',
  height: '2rem'
});

const EditButtonItem = styled.button({
  padding: '.5rem',
  margin: '.5rem 0 .5rem .5rem',
  borderRadius: '.5rem'
});

interface Props {
  onFirstButton: () => void;
  onSecondButton: () => void;
  updatePassword: (password: string) => void;
  firstMessage: string;
  secondMessage: string;
  isCommentFromAdmin: boolean;
}

export default function BottomMenu(props: Props) {
  return (
    <Container>
      {props.isCommentFromAdmin || (
        <PasswordInput
          placeholder='password'
          type='password'
          minLength={8}
          maxLength={20}
          onChange={(e) => {
            props.updatePassword(e.target.value);
          }}
        />
      )}
      <EditButtonItem onClick={() => props.onFirstButton()}>{props.firstMessage}</EditButtonItem>
      <EditButtonItem onClick={() => props.onSecondButton()}>{props.secondMessage}</EditButtonItem>
    </Container>
  );
}
