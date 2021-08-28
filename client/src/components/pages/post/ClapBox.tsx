import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { DECREASE_LIKE_COUNT, INCREASE_LIKE_COUNT, LikeCountQueryType, LikeCountVars } from 'src/query/post';
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
  const likeIds = useSelector<RootState, number[]>((state) => state.post.likedIds);

  const [like, setLike] = useState(() => {
    return likeIds.find((targetId) => targetId === id) ? true : false;
  });

  const [likeCount, setLikeCount] = useState(props.initLikeCount);
  const [increaseLikeCount, { data: increaseData }] = useMutation<LikeCountQueryType, LikeCountVars>(INCREASE_LIKE_COUNT);
  const [decreaseLikeCount, { data: decreaseData }] = useMutation<LikeCountQueryType, LikeCountVars>(DECREASE_LIKE_COUNT);

  const running = useRef(false);

  useEffect(() => {
    if (!running.current) return;
    async function doMutation() {
      if (like) {
        postDispatch.addLikedId(id);
        await increaseLikeCount({ variables: { id } });
        if (increaseData) setLikeCount(increaseData.likeCount);
      } else {
        postDispatch.deleteLikedId(id);
        await decreaseLikeCount({ variables: { id } });
        if (decreaseData) setLikeCount(decreaseData.likeCount);
      }
      running.current = false;
    }
    doMutation();
  }, [like]);

  function onClick() {
    if (!running.current) {
      running.current = true;
      setLike(!like);
      const addCount = !like ? 1 : -1;
      setLikeCount((prev) => prev + addCount);
    }
  }

  return (
    <Container>
      <Box>
        <FlexWrapper>
          <Icon onClick={onClick}>
            <FontAwesomeIcon icon={like ? solidHeart : regularHeart} style={{ fontSize: '3rem' }} />
            <Number>{likeCount}</Number>
          </Icon>
        </FlexWrapper>
      </Box>
    </Container>
  );
}
