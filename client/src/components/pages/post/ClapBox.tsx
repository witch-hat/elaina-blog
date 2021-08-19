import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp as regularThumbsUp, faComments } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp as solidThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';
import { EditLikeCountQueryType, EditLikeCountVars, EDIT_LIKE_COUNT } from 'src/query/post';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { postDispatch } from 'src/redux/post/dispatch';

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
  id: number;
}

export function ClapBox({ id, ...props }: Props) {
  const likeById = useSelector<RootState, { [id: number]: boolean }>((state) => state.post.likedById);
  const [like, setLike] = useState(false); // localStorage에서 초기값을 가져오도록 바꿔야 합니다.
  const [likeCount, setLikeCount] = useState(props.initLikeCount);
  const [editLikeCount] = useMutation<EditLikeCountQueryType, EditLikeCountVars>(EDIT_LIKE_COUNT);

  useEffect(() => {
    if (likeById && likeById.hasOwnProperty(id) && likeById[id]) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, []);

  useEffect(() => {
    editLikeCount({ variables: { id, likeCount } });
  }, [likeCount]);

  function onClick() {
    const nextLike = !like;
    setLike(nextLike);
    postDispatch.setLikedId(id, nextLike);
    if (nextLike) {
      setLikeCount(likeCount + 1);
    } else {
      setLikeCount(likeCount - 1);
    }
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
