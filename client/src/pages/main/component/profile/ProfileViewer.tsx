import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useMutation } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faEnvelope, faLink, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import { RoundImage } from 'src/components';
import { theme } from 'src/styles';
import { ProfileType, UPDATE_PROFILE } from 'src/query/profile';
import { Lang, trans } from 'src/resources/languages';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const ImageContainer = styled.div({
  poisition: 'relative',
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
});

const Name = styled.span({
  display: 'block',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  width: '100%',
  margin: '8px 0 0 0',
  wordBreak: 'keep-all',
  '@media screen and (max-width: 767px)': {
    margin: '10px 0',
    textAlign: 'center'
  }
});

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

const Description = styled.li({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  fontSize: '1.1rem',
  wordBreak: 'keep-all',
  margin: '.4rem 0'
});

const ButtonContainer = styled.div({
  width: '100%',
  marginTop: '.5rem',
  display: 'flex',
  justifyContent: 'center'
});

const EditButton = styled.div({
  width: '100%',
  padding: '.5rem',
  borderRadius: '.5rem',
  border: '1px solid #ddd',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  userSelect: 'none',
  '@media screen and (max-width: 767px)': {
    width: '200px'
  }
});

const ParagraphLink = styled.a({
  display: 'block',
  width: '100%'
});

const Paragraph = styled.p({
  fontSize: '1.0rem',
  display: 'block',
  width: '100%',
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
      <Name>{props.profile.name}</Name>
      <ListWrapper>
        <Description>
          <Paragraph>{props.profile.introduce}</Paragraph>
        </Description>
        {props.profile.link && (
          <Description>
            <ProfileIcon icon={faLink} />
            <ParagraphLink href={props.profile.link} target='_blank' rel='noopener noreferer nofollow'>
              <Paragraph>{props.profile.link}</Paragraph>
            </ParagraphLink>
          </Description>
        )}
        {props.profile.company && (
          <Description>
            <ProfileIcon icon={faBuilding} />
            <Paragraph>{props.profile.company}</Paragraph>
          </Description>
        )}
        {props.profile.location && (
          <Description>
            <ProfileIcon icon={faMapMarkerAlt} />
            <Paragraph>{props.profile.location}</Paragraph>
          </Description>
        )}
        {props.profile.email && (
          <Description>
            <ProfileIcon icon={faEnvelope} />
            <ParagraphLink href={`mailto:${props.profile.email}`}>
              <Paragraph>{props.profile.email}</Paragraph>
            </ParagraphLink>
          </Description>
        )}
      </ListWrapper>
      {props.isLogin && (
        <ButtonContainer>
          <EditButton onClick={() => props.setEditMode(true)}>{trans(Lang.EditProfile)}</EditButton>
        </ButtonContainer>
      )}
    </>
  );
}
