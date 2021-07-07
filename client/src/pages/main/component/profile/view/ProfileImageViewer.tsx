import React from 'react';
import styled, { keyframes, css } from 'styled-components';

import { RoundImage } from 'src/components';

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

interface Props {
  image: string;
}

function ProfileImageViewer(props: Props) {
  return (
    <ImageContainer>
      <RoundImage
        src={props.image}
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
  );
}

export const MemoizedProfileImageViewer = React.memo(ProfileImageViewer);
