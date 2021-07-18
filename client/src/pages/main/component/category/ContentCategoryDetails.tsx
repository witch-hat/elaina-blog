import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBook } from '@fortawesome/free-solid-svg-icons';

import { FormatUnifier } from 'src/utils';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div((props) => ({
  display: 'flex',
  width: '100%',
  marginTop: '.4rem',
  color: props.theme.detailText,
  fontSize: '.8rem'
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

const CategoryTitle = styled.p({
  display: '-webkit-box',
  width: '400px',
  wordBreak: 'break-all',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical'
});

interface Props {
  time: number | null;
  // count: number;
  categoryTitle: string;
}

export function ContentCategoryDetails(props: Props) {
  // const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Container>
      <LatestTime>
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px' }} />
        <p>{props.time !== null ? FormatUnifier.getFullFormatDate(new Date(props.time)) : 'None'}</p>
      </LatestTime>
      <CategoryTitleContainer>
        <FontAwesomeIcon icon={faBook} style={{ marginRight: '5px' }} />
        <CategoryTitle>{props.categoryTitle}</CategoryTitle>
      </CategoryTitleContainer>
    </Container>
  );
}
