import React from 'react';
import styled from 'styled-components';

const Input = styled.input((props) => ({
  display: 'inline-block',
  width: '100%',
  height: '2rem',
  marginRight: '.5rem',
  padding: '.2rem',
  outline: 'none',
  border: `1px solid ${props.theme.inputBorder}`,
  borderRadius: '.5rem',
  backgroundColor: props.theme.inputBackground,
  fontSize: '1.1rem',
  fontWeight: 'normal',
  color: props.theme.inputText
}));

const PreviewTitle = styled.p({
  display: '-webkit-box',
  height: '2rem',
  width: '100%',
  marginRight: '.5rem',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  textAlign: 'left',
  wordBreak: 'break-all',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '@media screen and (max-width: 1380px)': {
    wordBreak: 'break-all'
  }
});

interface Props {
  title: string;
  isEdit: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function CategoryTitle(props: Props) {
  if (props.isEdit) {
    return <Input type='text' value={props.title} maxLength={30} onChange={(e) => props.handleChange(e)} />;
  }

  return <PreviewTitle>{props.title}</PreviewTitle>;
}
