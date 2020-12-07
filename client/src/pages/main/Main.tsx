import styled from 'styled-components';

import { Profile } from './Profile';
import { ContentCategory } from './ContentCategory';
import { Container } from 'components';

export default function Main() {
  return (
    <Container>
      <Profile />
      <ContentCategory />
    </Container>
  );
}
