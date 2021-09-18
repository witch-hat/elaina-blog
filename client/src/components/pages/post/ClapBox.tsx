import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { DECREASE_LIKE_COUNT, INCREASE_LIKE_COUNT, LikeCountQueryType, LikeCountVars } from 'src/query/post';
import { RootState } from 'src/redux/rootReducer';
import { postDispatch } from 'src/redux/post/dispatch';
import { SubmitButton } from 'src/components/common/button/SubmitButton';

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
  margin: '2rem 0',
  alignItems: 'center',
  justifyContent: 'center'
});

const Icon = styled.span((props) => ({
  display: 'inline-flex',
  padding: '.5rem',
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

  async function onClick() {
    setLike(!like);
    const addCount = !like ? 1 : -1;
    setLikeCount((prev) => prev + addCount);
    if (!like) {
      postDispatch.addLikedId(id);
      await increaseLikeCount({ variables: { id } });
      if (increaseData) setLikeCount(increaseData.likeCount);
    } else {
      postDispatch.deleteLikedId(id);
      await decreaseLikeCount({ variables: { id } });
      if (decreaseData) setLikeCount(decreaseData.likeCount);
    }
  }

  return (
    <Container>
      <Box>
        <FlexWrapper>
          <SubmitButton blockedFunction={onClick}>
            <Icon>
              <FontAwesomeIcon icon={like ? solidHeart : regularHeart} style={{ fontSize: '3rem' }} />
              <Number>{likeCount}</Number>
            </Icon>
          </SubmitButton>
        </FlexWrapper>
      </Box>
    </Container>
  );
}
