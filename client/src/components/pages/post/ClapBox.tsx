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
  const likeIds = useSelector<RootState, number[]>((state) => state.post.likedIds);

  const [like, setLike] = useState(false);
  const [running, setRunning] = useState(false);
  const [likeCount, setLikeCount] = useState(props.initLikeCount);
  const [increaseLikeCount] = useMutation<IncreaseLikeCountQueryType, IncreaseLikeCountVars>(INCREASE_LIKE_COUNT);
  const [decreaseLikeCount] = useMutation<DecreaseLikeCountQueryType, DecreaseLikeCountVars>(DECREASE_LIKE_COUNT);

  useEffect(() => {
    if (likeIds.find((targetId) => targetId === id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, []);

  useEffect(() => {
    //useEffect문 안쪽에서 running이 false이면 걸러 버리고 promise문 실행한다.
    if (!running) return;
    async function changeNextLike() {
      if (like) {
        postDispatch.addLikedId(id);
        await increaseLikeCount({ variables: { id } });
      } else {
        postDispatch.deleteLikedId(id);
        await decreaseLikeCount({ variables: { id } });
      }
    }
    changeNextLike();
    //원하는 지연시간 만큼 setTimeout한 뒤 그 안에 setRunning(false)만 집어 넣는다.
    setTimeout(() => {
      setRunning(false);
    }, 1000);
  }, [running]); //의존 변수로는 running만 넣으면 된다. (따라서 running의 초깃값은 false이다.)

  function onClick() {
    if (!running) {
      //Promise 없는 코드를 setRunning(true)와 함께 if(!running)문 안쪽으로 집어넣는다.
      setRunning(true);
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
