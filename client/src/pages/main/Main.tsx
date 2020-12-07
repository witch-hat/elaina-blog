import styled from 'styled-components';

import { Profile } from './Profile';
import { ContentCategory } from './ContentCategory';

const MainContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%'
});

export default function Main() {
  return (
    <MainContainer>
      <Profile />
      <ContentCategory />
    </MainContainer>
  );
}
