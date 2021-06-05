import React from 'react';
import { useSelector } from 'react-redux';
import styled, { keyframes, css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { RoundImage } from 'src/components';
import { theme } from 'src/styles';
import { ProfileType } from 'src/query/profile';
import { Lang, trans } from 'src/resources/languages';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

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

const FadeIn = keyframes({
  from: {
    opacity: '0'
  },
  to: {
    opacity: '1'
  }
});

const ImageContainer = styled.div(
  {
    display: 'flex',
    poisition: 'relative',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  css`
    animation: ${MoveRight} 0.4s ease-out forwards;
  `
);

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

const ButtonContainer = styled.div(
  {
    display: 'flex',
    width: '100%',
    marginTop: '.5rem',
    justifyContent: 'center',
    opacity: '0'
  },
  css<{ delay: number }>`
    animation: ${FadeIn} 0.4s ease-out forwards;
    animation-delay: ${(props) => props.delay * 0.2}s;
  `
);

const EditButton = styled.div({
  display: 'flex',
  width: '100%',
  padding: '.5rem',
  border: '1px solid #ddd',
  borderRadius: '.5rem',
  justifyContent: 'center',
  cursor: 'pointer',
  userSelect: 'none',
  '@media screen and (max-width: 767px)': {
    width: '200px'
  }
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

interface ProfileIconProps {
  icon: IconProp;
}

function ProfileIcon(props: ProfileIconProps) {
  return <FontAwesomeIcon icon={props.icon} style={{ marginRight: '8px' }} />;
}

interface Props {
  profile: ProfileType;
  isLogin: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ProfileViewer(props: Props) {
  const themeMode: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  let animationDelay = 1;

  return (
    <>
      <ImageContainer>
        <RoundImage
          src={props.profile.image}
          alt='Profile Image'
          styles={{
            borderRadius: '50%',
            width: '280px',
            height: '280px',
            medium: { width: '100%', height: '100%' },
            small: { width: '200px', height: '200px' }
          }}
        />
      </ImageContainer>
      <Name delay={animationDelay++}>{props.profile.name}</Name>
      <ListWrapper>
        <Description delay={animationDelay++}>
          <Paragraph>{props.profile.introduce}</Paragraph>
        </Description>
        {props.profile.link && (
          <Description delay={animationDelay++}>
            <ProfileIcon icon={faLink} />
            <ParagraphLink href={props.profile.link} target='_blank' rel='noopener noreferer nofollow'>
              <Paragraph>{props.profile.link}</Paragraph>
            </ParagraphLink>
          </Description>
        )}
        {props.profile.company && (
          <Description delay={animationDelay++}>
            <ProfileIcon icon={faBuilding} />
            <Paragraph>{props.profile.company}</Paragraph>
          </Description>
        )}
        {props.profile.location && (
          <Description delay={animationDelay++}>
            <ProfileIcon icon={faMapMarkerAlt} />
            <Paragraph>{props.profile.location}</Paragraph>
          </Description>
        )}
        {props.profile.email && (
          <Description delay={animationDelay++}>
            <ProfileIcon icon={faEnvelope} />
            <ParagraphLink href={`mailto:${props.profile.email}`}>
              <Paragraph>{props.profile.email}</Paragraph>
            </ParagraphLink>
          </Description>
        )}
      </ListWrapper>
      {props.isLogin && (
        <ButtonContainer delay={animationDelay++}>
          <EditButton onClick={() => props.setEditMode(true)}>{trans(Lang.EditProfile)}</EditButton>
        </ButtonContainer>
      )}
    </>
  );
}
