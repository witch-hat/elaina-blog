import styled from 'styled-components';

const ProfileContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '300px',
  height: '100%'
});

interface Props {}

export function Profile() {
  return <ProfileContainer>This is Profile</ProfileContainer>;
}
