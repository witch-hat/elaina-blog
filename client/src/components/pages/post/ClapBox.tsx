import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as regularThumbsUp, faComments } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Container = styled.aside({
  width: '100%',
  padding: '.5rem'
});

const Box = styled.div({
  display: 'flex',
  width: '100%',
  justifyContent: 'center'
});

const FlexWrapper = styled.div({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'left'
});

const Icon = styled.span({
  display: 'inline-flex',
  padding: '.5rem',
  marginRight: '.75rem',
  alignItems: 'center',
  fontSize: '1.3rem',
  cursor: 'pointer'
});

const Number = styled.p({
  display: 'inline-block',
  marginLeft: '.5rem',
  fontSize: '.9rem',
  userSelect: 'none'
});

interface Props {
  initLikeCount: number;
  commentsCount: number;
}

export function ClapBox(props: Props) {
  const [like, setLike] = useState(false); // localStorage에서 초기값을 가져오도록 바꿔야 합니다.
  const [likeCount, setLikeCount] = useState(props.initLikeCount); // server에서 초기값을 가져오도록 바꿔야 합니다.

  function updateLikeCount(nextLike: boolean) {
    if (nextLike) {
      setLikeCount((prev) => prev + 1);
    } else {
      setLikeCount((prev) => prev - 1);
    } // server에서 해당 값을 변경하도록 바꿔야 합니다.
  }

  function onClick() {
    const nextLike = !like;
    setLike(nextLike);
    updateLikeCount(nextLike);
  }

  return (
    <Container>
      <Box>
        <FlexWrapper>
          <Icon>
            <FontAwesomeIcon onClick={onClick} icon={like ? solidThumbsUp : regularThumbsUp} />
            <Number>{likeCount}</Number>
          </Icon>
          <Icon>
            <FontAwesomeIcon icon={faComments} />
            <Number>{props.commentsCount}</Number>
          </Icon>
        </FlexWrapper>
      </Box>
    </Container>
  );
}
