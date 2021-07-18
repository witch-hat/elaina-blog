import React from 'react';
import styled from 'styled-components';

import { LoginDevice } from 'src/query/user';

const Container = styled.div({
  display: 'flex',
  width: '400px',
  padding: '.5rem',
  border: '1px solid black',
  borderRadius: '.5rem'
});

interface Props {
  device: LoginDevice;
}

export function DeviceItem(props: Props) {
  const latestLoginTime = new Date(props.device.latestLogin);

  return (
    <Container>
      <div>
        <div>{props.device.userUniqueId}</div>
        <div>{latestLoginTime.toDateString()}</div>
      </div>
    </Container>
  );
}
