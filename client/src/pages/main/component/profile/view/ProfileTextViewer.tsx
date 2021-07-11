import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import { ProfileType } from 'src/query/profile';

const MoveRight = keyframes({
  from: {
    opacity: '0',
    transform: 'translateX(-1.5rem)'
  },
  to: {
    opacity: '1',
    transform: 'translateX(0)'
  }
});

const Name = styled.span(
  {
    display: 'block',
    width: '100%',
    margin: '8px 0 0 0',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    wordBreak: 'keep-all',
    opacity: '0',
    '@media screen and (max-width: 767px)': {
      margin: '10px 0',
      textAlign: 'center'
    }
  },
  css<{ delay: number }>`
    animation: ${MoveRight} 0.4s ease-out forwards;
    animation-delay: ${(props) => props.delay * 0.2}s;
  `
);

const ListWrapper = styled.ul({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '& > li:first-child': {
    margin: '0 0 0.7rem',
    '@media screen and (max-width: 767px)': {
      textAlign: 'center'
    }
  }
});

const Description = styled.li(
  {
    display: 'flex',
    width: '100%',
    margin: '.4rem 0',
    alignItems: 'center',
    fontSize: '1.1rem',
    wordBreak: 'keep-all',
    opacity: '0'
  },
  css<{ delay: number }>`
    animation: ${MoveRight} 0.4s ease-out forwards;
    animation-delay: ${(props) => props.delay * 0.2}s;
  `
);

const Icon = styled.div({
  display: 'flex',
  width: '2rem',
  height: '2rem',
  alignItems: 'center',
  justifyContent: 'center'
});

const ParagraphLink = styled.a({
  display: 'block',
  width: '100%',
  '& > p': {
    cursor: 'pointer'
  },
  '& > p:hover': {
    textDecoration: 'underline'
  }
});

const Paragraph = styled.p({
  display: 'block',
  width: '100%',
  fontSize: '1.0rem',
  overflow: 'hidden',
  wordBreak: 'break-all',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
});

interface Props {
  profile: ProfileType;
}

function ProfileTextViewer(props: Props) {
  let animationDelay = 1;

  return (
    <>
      <Name delay={animationDelay++}>{props.profile.name}</Name>
      <ListWrapper>
        <Description delay={animationDelay++}>
          <Paragraph>{props.profile.introduce}</Paragraph>
        </Description>
        {props.profile.link && (
          <Description delay={animationDelay++}>
            <Icon>
              <FontAwesomeIcon icon={faLink} />
            </Icon>
            <ParagraphLink href={props.profile.link} target='_blank' rel='noopener noreferer nofollow'>
              <Paragraph>{props.profile.link}</Paragraph>
            </ParagraphLink>
          </Description>
        )}
        {props.profile.company && (
          <Description delay={animationDelay++}>
            <Icon>
              <FontAwesomeIcon icon={faBuilding} />
            </Icon>
            <Paragraph>{props.profile.company}</Paragraph>
          </Description>
        )}
        {props.profile.location && (
          <Description delay={animationDelay++}>
            <Icon>
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </Icon>
            <Paragraph>{props.profile.location}</Paragraph>
          </Description>
        )}
        {props.profile.email && (
          <Description delay={animationDelay++}>
            <Icon>
              <FontAwesomeIcon icon={faEnvelope} />
            </Icon>
            <ParagraphLink href={`mailto:${props.profile.email}`}>
              <Paragraph>{props.profile.email}</Paragraph>
            </ParagraphLink>
          </Description>
        )}
      </ListWrapper>
    </>
  );
}

export const MemoizedProfileTextViewer = React.memo(ProfileTextViewer);
