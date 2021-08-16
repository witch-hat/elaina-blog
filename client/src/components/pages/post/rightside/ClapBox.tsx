import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as regularThumbsUp, faComments } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';

const Container = styled.aside({
  width: '100%',
  padding: '.5rem',
  '@media screen and (max-width: 1380px)': {
    display: 'none',
    opacity: 0
  }
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
  justifyContent: 'center'
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
  commentsCount: number;
  scrollToComment: () => void;
}

export function ClapBox(props: Props) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  function updateLikeNumber() {
    if (!like) setLikeCount((prev) => prev + 1);
    else setLikeCount((prev) => prev - 1);
  }

  function onClick() {
    setLike((prev) => !prev);
    updateLikeNumber();
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
            <FontAwesomeIcon icon={faComments} onClick={() => props.scrollToComment()} />
            <Number>{props.commentsCount}</Number>
          </Icon>
        </FlexWrapper>
      </Box>
    </Container>
  );
}
