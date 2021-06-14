import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faBook } from '@fortawesome/free-solid-svg-icons';

import { FormatUnifier } from 'src/utils';
import { theme } from 'src/styles';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div<{ themeMode: ThemeMode }>((props) => ({
  display: 'flex',
  marginTop: '.4rem',
  color: theme[props.themeMode].detailText,
  fontSize: '.8rem'
}));

const LatestTime = styled.span({
  display: 'flex',
  marginRight: '.8rem',
  alignItems: 'center'
});

const PostCount = styled.span({
  display: 'flex',
  alignItems: 'center'
});

interface Props {
  time: Date | null;
  count: number;
}

export function ContentCategoryDetails(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);

  return (
    <Container themeMode={themeMode}>
      <LatestTime>
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '5px' }} />
        <p>{props.time !== null ? FormatUnifier.getFullFormatDate(new Date(props.time)) : 'None'}</p>
      </LatestTime>
      <PostCount>
        <FontAwesomeIcon icon={faBook} style={{ marginRight: '5px' }} />
        <p>{props.count}</p>
      </PostCount>
    </Container>
  );
}
