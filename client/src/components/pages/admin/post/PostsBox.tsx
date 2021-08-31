import React from 'react';
import styled from 'styled-components';
import { FormatUnifier } from 'src/utils';

const BoardTD = styled.td({
  border: '1px solid #ddd',
  padding: '12px'
});

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

const DeleteButton = styled.button({
  outline: 'none',
  fontSize: '11px',
  color: '#e9493d',
  padding: '3px 10px',
  borderRadius: '8px',
  cursor: 'pointer',
  border: '1px solid #e9493d',
  backgroundColor: 'transparent',
  '&:active': {
    border: '1px solid blue'
  }
});

interface PostData {
  _id: number;
  title: string;
  savedAt: Date;
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
