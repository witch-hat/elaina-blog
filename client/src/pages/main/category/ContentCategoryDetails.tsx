import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBook } from '@fortawesome/free-solid-svg-icons';

import { FormatUnifier } from 'src/utils';

const Container = styled.div((props) => ({
  display: 'flex',
  width: '100%',
  marginTop: '.4rem',
  color: props.theme.detailText,
  fontSize: '.85rem'
}));

const LatestTime = styled.span({
  display: 'flex',
  marginRight: '.75rem',
  alignItems: 'center'
});

const CategoryTitleContainer = styled.span({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  flex: 1
});

const PostCount = styled.p({
  display: '-webkit-box',
  wordBreak: 'break-all',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical'
});

interface Props {
  time: number | null;
  count: number;
}

export function ContentCategoryDetails(props: Props) {
  return (
    <Container>
      <LatestTime>
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px' }} />
        <p>{props.time !== null ? FormatUnifier.getFullFormatDate(new Date(props.time)) : 'None'}</p>
      </LatestTime>
      <CategoryTitleContainer>
        <FontAwesomeIcon icon={faBook} style={{ marginRight: '5px' }} />
        <PostCount>{props.count}</PostCount>
      </CategoryTitleContainer>
    </Container>
  );
}
