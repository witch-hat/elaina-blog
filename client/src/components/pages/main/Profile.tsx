import styled from 'styled-components';

import { FlexWrapper, RoundImage } from 'components';
import { color } from 'resources';

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItmes: 'center',
  padding: '10px',
  justifySelf: 'stretch',
  minHeight: 'calc(90vh - 40px)',
  flex: 1
});

const Name = styled.div({
  fontSize: '22px',
  fontWeight: 'bold',
  width: '100%',
  margin: '15px 0',
  wordBreak: 'keep-all'
});

const Description = styled.div({
  width: '100%',
  fontSize: '18px',
  wordBreak: 'keep-all',
  margin: '10px 0'
});

interface Props {}

export function Profile(props: Props) {
  return (
    <Container>
      <RoundImage
        src={'/images/FakeProfile.png'}
        styles={{ borderRadius: '50%', border: `4px solid ${color.blogName}`, width: '280px', height: '280px' }}
      />
      <Name>Elaina</Name>
      <Description>Hello My name is Elaina~~~~~~~</Description>
      <Description>
        <i className='fas fa-link'></i>&nbsp;Link
      </Description>
      <Description>
        <i className='far fa-building'></i>&nbsp;Company
      </Description>
      <Description>
        <i className='fas fa-map-marker-alt'></i>&nbsp;Location
      </Description>
      <Description>
        <i className='far fa-envelope'></i>&nbsp;Email
      </Description>
    </Container>
  );
}
