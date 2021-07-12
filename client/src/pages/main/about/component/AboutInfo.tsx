import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

import { FormatUnifier } from 'src/utils';

const Container = styled.div({
  display: 'flex'
});

const Author = styled.span({
  display: 'flex',
  marginRight: '1rem',
  alignItems: 'center'
});

const Time = styled.span({
  display: 'flex',
  alignItems: 'center'
});

interface Props {
  name: string;
  updatedAt: number;
}

function AboutInfo(props: Props) {
  const updatedAt = new Date(props.updatedAt);

  return (
    <Container>
      <Author>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
        {props.name}
      </Author>
      <Time>
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5rem' }} />
        {FormatUnifier.getFullFormatDate(updatedAt)}
      </Time>
    </Container>
  );
}

export const MemoizedAboutInfo = React.memo(AboutInfo);
