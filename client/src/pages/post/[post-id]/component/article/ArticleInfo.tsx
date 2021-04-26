import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

import { FormatUnifier } from 'src/utils';

const ContentInfoWrapper = styled.div({
  display: 'flex'
});

const Author = styled.span({
  marginRight: '1rem',
  display: 'flex',
  alignItems: 'center'
});

const Time = styled.span({
  display: 'flex',
  alignItems: 'center'
});

interface Props {
  author: string;
  time: Date;
}

export function ArticleInfo(props: Props) {
  return (
    <ContentInfoWrapper>
      <Author>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
        {props.author}
      </Author>
      <Time>
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5rem' }} />
        {FormatUnifier.getFullFormatDate(props.time)}
      </Time>
    </ContentInfoWrapper>
  );
}

export default React.memo(ArticleInfo);
