import styled from 'styled-components';

import { RoundImage } from 'src/components';
import { theme } from 'src/resources';

const Container = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItmes: 'center',
  padding: '10px',
  // justifySelf: 'stretch',
  minHeight: 'calc(90vh - 40px)',
  // flex: 1
  alignSelf: 'stretch'
});

const Name = styled.span({
  display: 'block',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  width: '100%',
  margin: '15px 0',
  wordBreak: 'keep-all'
});

const ListWrapper = styled.ul({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start'
});

const Description = styled.li({
  width: '100%',
  fontSize: '1.1rem',
  wordBreak: 'keep-all',
  margin: '10px 0'
});

interface Props {}

export default function Profile(props: Props) {
  return (
    <Container>
      <RoundImage
        src={'/images/FakeProfile.png'}
        styles={{ borderRadius: '50%', border: `4px solid ${theme.light.blogName}`, width: '280px', height: '280px' }}
      />
      <Name>Elaina</Name>
      <ListWrapper>
        <Description>Hello My name is Elaina~~~~~~~</Description>
        <Description>
          <i className='fas fa-link'></i>&nbsp;
          <a href='/' target='_blank' rel='noopener noreferer nofollow'>
            Link
          </a>
        </Description>
        <Description>
          <i className='far fa-building'></i>&nbsp;
          <span>Company</span>
        </Description>
        <Description>
          <i className='fas fa-map-marker-alt'></i>&nbsp;
          <span>Location</span>
        </Description>
        <Description>
          <i className='far fa-envelope'></i>&nbsp;
          <a href='mailto:'>Email</a>
        </Description>
      </ListWrapper>
    </Container>
  );
}
