import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

const TitleContainer = styled.div({
  display: 'flex',
  padding: '.5rem .5rem .5rem 0',
  marginBottom: '.5rem',
  alignItems: 'center'
});

const MenuTitle = styled.p({
  marginLeft: '.2rem',
  fontSize: '1.1rem',
  fontWeight: 'bold'
});

interface Props {
  icon: IconDefinition;
  title: string;
}

export function SideMenuTitle(props: Props) {
  return (
    <TitleContainer>
      <FontAwesomeIcon icon={props.icon} />
      <MenuTitle>{props.title}</MenuTitle>
    </TitleContainer>
  );
}
