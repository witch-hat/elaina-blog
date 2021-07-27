import React from 'react';
import styled from 'styled-components';

import { RoundImage } from 'src/components';

const ImageContainer = styled.div({
  display: 'flex',
  poisition: 'relative',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
});

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
