import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
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
          <Icon onClick={onClick}>
            <FontAwesomeIcon icon={like ? solidHeart : regularHeart} style={{ fontSize: '3rem' }} />
            <Number>{likeCount}</Number>
          </Icon>
        </FlexWrapper>
      </Box>
    </Container>
  );
}
