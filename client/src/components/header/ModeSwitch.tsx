import React, { useState } from 'react';
import styled from 'styled-components';

const Switch = styled.label({
  flexShrink: 0,
  marginRight: '10px',
  position: 'relative',
  display: 'inline-block',
  width: '60px',
  height: '34px'
});

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #fff;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
  &:checked + ${Slider} {
    background-color: #2196f3;
  }
  &:checked + ${Slider}:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
`;

export function ModeSwitch() {
  const [isChecked, setIsChecked] = useState(false);

  console.log(isChecked);

  return (
    <Switch>
      <Input type='checkbox' checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
      <Slider></Slider>
    </Switch>
  );
}
