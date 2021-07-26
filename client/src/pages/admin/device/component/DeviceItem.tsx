import React from 'react';
import styled from 'styled-components';

import { LoginDeviceType } from 'src/query/user';

const Container = styled.div({
  display: 'flex',
  width: '400px',
  padding: '.5rem',
  border: '1px solid black',
  borderRadius: '.5rem'
});

interface Props {
  device: LoginDeviceType;
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
