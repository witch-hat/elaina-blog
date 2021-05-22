import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock } from '@fortawesome/free-solid-svg-icons';

import { FormatUnifier } from 'src/utils';
import { ProfileType } from 'src/query/profile';

const ContentInfoWrapper = styled.div({
  display: 'flex'
});

const Author = styled.div({
  position: 'relative',
  marginRight: '1rem',
  display: 'flex',
  alignItems: 'center',
  transition: '.2s all',
  '&:hover': {
    cursor: 'pointer',
    color: 'rgb(134, 125, 255)'
  }
});

const HoverBox = styled.div({
  position: 'absolute',
  top: '2rem',
  left: '0',
  width: '300px',
  padding: '.5rem',
  backgroundColor: '#ddd',
  borderRadius: '.5rem',
  cursor: 'auto',
  zIndex: 1,
  color: '#121314',
  '&::after': {
    content: "''",
    position: 'absolute',
    width: '0',
    height: '0',
    border: '.8rem solid transparent',
    borderBottomColor: '#ddd',
    borderTop: '0',
    borderLeft: '0',
    top: '-.8rem',
    left: '20%'
  }
});

const Time = styled.span({
  display: 'flex',
  alignItems: 'center'
});

interface Props {
  profile: ProfileType;
  time: Date;
}

export function ArticleInfo(props: Props) {
  let timeOutId: number;

  const [isHover, setIsHover] = useState(false);

  function handleHover(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    timeOutId = setTimeout(() => {
      setIsHover(true);
    }, 300);
  }

  function clearHover() {
    clearTimeout(timeOutId);
    setIsHover(false);
  }

  return (
    <ContentInfoWrapper>
      <Author onMouseEnter={(e) => handleHover(e)} onMouseLeave={() => clearHover()}>
        <FontAwesomeIcon icon={faUser} style={{ marginRight: '0.5rem' }} />
        {props.profile.name!}
        {isHover && (
          <HoverBox>
            <div>
              <p>{props.profile.introduce}</p>
            </div>
            <div>
              <p>{props.profile.location}</p>
            </div>
            {props.profile.company && (
              <div>
                <p>{props.profile.company}</p>
              </div>
            )}
          </HoverBox>
        )}
      </Author>
      <Time>
        <FontAwesomeIcon icon={faClock} style={{ marginRight: '0.5rem' }} />
        {FormatUnifier.getFullFormatDate(props.time)}
      </Time>
    </ContentInfoWrapper>
  );
}

export default React.memo(ArticleInfo);
