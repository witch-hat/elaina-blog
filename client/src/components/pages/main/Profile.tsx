import styled from 'styled-components';

import { Container, RoundImage } from 'components';
import { color } from 'resources';

const Name = styled.div({
  fontSize: '22px',
  fontWeight: 'bold',
  width: '100%',
  padding: '0 50px',
  margin: '15px 0',
  wordBreak: 'keep-all'
});

interface Props {}

export function Profile() {
  return (
    <Container styles={{ width: '300px', padding: '10px', flexDirection: 'column', justifyContent: 'flex-start' }}>
      <RoundImage
        src={'/images/FakeProfile.png'}
        styles={{ borderRadius: '50%', border: `4px solid ${color.blogName}`, width: '200px', height: '200px' }}
      />
      <Name>Elaina</Name>
    </Container>
  );
}
