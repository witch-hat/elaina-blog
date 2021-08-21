import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import {
  DecreaseLikeCountQueryType,
  DecreaseLikeCountVars,
  DECREASE_LIKE_COUNT,
  IncreaseLikeCountQueryType,
  IncreaseLikeCountVars,
  INCREASE_LIKE_COUNT
} from 'src/query/post';
import { RootState } from 'src/redux/rootReducer';
import { postDispatch } from 'src/redux/post/dispatch';

const Container = styled.div({
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
  justifyContent: 'center'
});

const Icon = styled.span((props) => ({
  display: 'inline-flex',
  padding: '.5rem',
  margin: '2rem 0',
  border: `.15rem solid ${props.theme.likeColor}`,
  borderRadius: '.5rem',
  color: props.theme.likeColor,
  alignItems: 'center',
  cursor: 'pointer'
}));

const Number = styled.p({
  display: 'inline-block',
  marginLeft: '.5rem',
  padding: '0 0 0 .5rem',
  fontSize: '2rem',
  userSelect: 'none'
});

interface Props {
  initLikeCount: number;
  commentsCount: number;
  id: number;
}

export function ClapBox({ id, ...props }: Props) {
  const likeById = useSelector<RootState, { [id: number]: boolean }>((state) => state.post.likedById);

  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(props.initLikeCount);
  const [increaseLikeCount] = useMutation<IncreaseLikeCountQueryType, IncreaseLikeCountVars>(INCREASE_LIKE_COUNT);
  const [decreaseLikeCount] = useMutation<DecreaseLikeCountQueryType, DecreaseLikeCountVars>(DECREASE_LIKE_COUNT);

  let isRunning = false;

  useEffect(() => {
    if (likeById && likeById.hasOwnProperty(id) && likeById[id]) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, []);

  async function onClick() {
    const nextLike = !like;
    const countAddition = nextLike ? 1 : -1;

    if (nextLike) {
      await increaseLikeCount({ variables: { id } });
    } else {
      await decreaseLikeCount({ variables: { id } });
    }

    setLikeCount((prev) => prev + countAddition);
    setLike(nextLike);

    postDispatch.setLikedId(id, nextLike);
  }

  return (
    <Container>
      <Box>
        <FlexWrapper>
          <Icon
            onClick={() => {
              setTimeout(async () => {
                if (isRunning) return;
                console.log('start');
                isRunning = true;
                await onClick();
                isRunning = false;
                console.log('end');
              }, 500);
            }}
          >
            <FontAwesomeIcon icon={like ? solidHeart : regularHeart} style={{ fontSize: '3rem' }} />
            <Number>{likeCount}</Number>
          </Icon>
        </FlexWrapper>
      </Box>
    </Container>
  );
}
