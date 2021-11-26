import React from 'react';
import styled from 'styled-components';

import { FormatUnifier } from 'src/utils';

const BoardTD = styled.td((props) => ({
  padding: '12px',
  border: `1px solid ${props.theme.borderColor}`
}));

const BoardTdTitle = styled(BoardTD)({
  width: '400px'
});

const BoardTdCenter = styled(BoardTD)({
  textAlign: 'center'
});

const BoardTR = styled.tr({
  '&:hover': {
    backgroundColor: '#d1cffaa7'
  }
});

const DeleteButton = styled.button((props) => ({
  padding: '3px 10px',
  outline: 'none',
  color: '#e9493d',
  border: `1px solid ${props.theme.borderColor}`,
  borderRadius: '8px',
  backgroundColor: 'transparent',
  '&:active': {
    border: '1px solid blue'
  },
  fontSize: '11px',
  cursor: 'pointer'
}));

interface PostData {
  _id: number;
  title: string;
  savedAt: number;
  article: string;
  category: string;
  onDeleteClick: (id: number) => void;
}

export function PostsBox(props: PostData) {
  return (
    <BoardTR key={props.title + props._id}>
      <BoardTdCenter>{props._id}</BoardTdCenter>
      <BoardTD>{props.category}</BoardTD>
      <BoardTdTitle>{props.title}</BoardTdTitle>
      <BoardTdCenter>{FormatUnifier.getFullFormatDate(new Date(props.savedAt))}</BoardTdCenter>
      <BoardTdCenter>
        <DeleteButton onClick={() => props.onDeleteClick(props._id)}>Delete</DeleteButton>
      </BoardTdCenter>
    </BoardTR>
  );
}
