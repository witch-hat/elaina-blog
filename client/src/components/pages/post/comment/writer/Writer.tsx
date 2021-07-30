import React, { useState, useCallback, useRef, TextareaHTMLAttributes, RefObject, FormEvent, MutableRefObject, useEffect } from 'react';
import styled from 'styled-components';

import { Lang, trans } from 'src/resources/languages';
import { MemoizedInputContainer } from './InputContainer';

const EditorContainer = styled.form({
  width: '100%',
  margin: '1rem 0 .5rem 0'
});

const InputWrapper = styled.div({
  display: 'flex',
  marginBottom: '.5rem',
  '@media screen and (max-width: 400px)': {
    flexDirection: 'column',
    '& > div:last-child': {
      margin: '0'
    }
  }
});

const Editor = styled.textarea((props) => ({
  display: 'block',
  width: '100%',
  minHeight: '5rem',
  padding: '.5rem',
  border: `1px solid ${props.theme.inputBorder}`,
  borderRadius: '.5rem',
  outline: 'none',
  backgroundColor: props.theme.inputBackground,
  overflowY: 'hidden',
  resize: 'none',
  wordBreak: 'keep-all',
  color: props.theme.inputText
}));

const ButtonContainer = styled.div({
  display: 'flex',
  width: '100%',
  height: '2.5rem',
  margin: '1rem 0 0',
  justifyContent: 'flex-end'
});

const SubmitButton = styled.button((props) => ({
  display: 'flex',
  width: '6rem',
  height: '100%',
  padding: '.5rem',
  border: '1px solid #ddd',
  borderRadius: '.5rem',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: props.theme.hoverBackground
  }
}));

type RefFn = (node: HTMLTextAreaElement) => void;

export const getHeight = (rows: number, el: HTMLTextAreaElement): number => {
  const { borderBottomWidth, borderTopWidth, fontSize, lineHeight, paddingBottom, paddingTop } = window.getComputedStyle(el);

  const lh = lineHeight === 'normal' ? parseFloat(fontSize) * 1.2 : parseFloat(lineHeight);

  const rowHeight =
    rows === 0
      ? 0
      : lh * rows + parseFloat(borderBottomWidth) + parseFloat(borderTopWidth) + parseFloat(paddingBottom) + parseFloat(paddingTop);

  const scrollHeight = el.scrollHeight + parseFloat(borderBottomWidth) + parseFloat(borderTopWidth);

  return Math.max(rowHeight, scrollHeight);
};

export const resize = (rows: number, el: HTMLTextAreaElement | null): void => {
  if (el) {
    let overflowY = 'hidden';
    const { maxHeight } = window.getComputedStyle(el);

    if (maxHeight !== 'none') {
      const maxHeightN = parseFloat(maxHeight);

      if (maxHeightN < el.scrollHeight) {
        overflowY = '';
      }
    }

    el.style.height = '0';
    el.style.overflowY = overflowY;
    el.style.height = `${getHeight(rows, el)}px`;
  }
};

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'rows'> {
  forwardedRef?: RefObject<HTMLTextAreaElement> | RefFn;
  onChange?: (evt: FormEvent<HTMLTextAreaElement>) => void;
  onInput?: (evt: FormEvent<HTMLTextAreaElement>) => void;
  rows?: string | number | undefined;
  value?: string;
  isLogin: boolean;
  addComment: (username: string, password: string, comment: string) => Promise<void>;
  isComment?: boolean;
}

export function Writer({ forwardedRef, onChange, ...props }: TextareaProps) {
  const rows = props.rows ? parseInt('' + props.rows, 10) : 0;
  const isForwardedRefFn = typeof forwardedRef === 'function';
  const internalRef = useRef<HTMLTextAreaElement>();
  const ref = (isForwardedRefFn || !forwardedRef ? internalRef : forwardedRef) as MutableRefObject<HTMLTextAreaElement>;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [comment, setComment] = useState('');

  useEffect(() => {
    resize(rows, ref.current);
  }, [ref, rows, props.value]);

  function reset() {
    setUsername('');
    setPassword('');
    setComment('');
    resize(rows, ref.current);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await props.addComment(username, password, comment);

    props.isComment && reset();
  }

  const onIDChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value), []);

  const onPWChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value), []);

  const handleInput = useCallback(
    (e) => {
      if (onChange) {
        onChange(e);
      }
      resize(rows, ref.current);
    },
    [onChange, ref, rows]
  );

  const handleRef = useCallback(
    (node) => {
      ref.current = node;

      if (isForwardedRefFn) {
        (forwardedRef as RefFn)(node);
      }
    },
    [forwardedRef, isForwardedRefFn, ref]
  );

  return (
    <EditorContainer onSubmit={onSubmit}>
      {props.isLogin || (
        <InputWrapper>
          <MemoizedInputContainer
            label='ID'
            type='text'
            minLength={2}
            maxLength={10}
            placeholder='ID'
            value={username}
            onChange={onIDChange}
          />
          <MemoizedInputContainer
            label='PW'
            type='password'
            minLength={8}
            maxLength={20}
            placeholder='PW'
            value={password}
            onChange={onPWChange}
          />
        </InputWrapper>
      )}
      <Editor
        {...props}
        role='textbox'
        placeholder='Comment...'
        value={comment}
        ref={handleRef}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setComment(e.target.value);
          handleInput(e);
        }}
        rows={rows}
      />
      <ButtonContainer>
        <SubmitButton type='submit'>{trans(Lang.Save)}</SubmitButton>
      </ButtonContainer>
    </EditorContainer>
  );
}
