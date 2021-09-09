import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Button = styled.span({
  width: 'max-content',
  height: 'max-content'
});

interface SubmitButtonProps {
  prevFunction?: () => any;
  nextFunction: () => Promise<any>;
  waitTime?: number;
  children?: JSX.Element;
}

export function SubmitButton(props: SubmitButtonProps) {
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    async function doMutation() {
      await props.nextFunction();
      if (!props.waitTime) setRunning(false);
    }
    doMutation();
    if (props.waitTime) {
      setTimeout(() => {
        setRunning(false);
      }, props.waitTime);
    }
  }, [running]);

  function onClick() {
    if (!running) {
      setRunning(true);
      if (props.prevFunction) props.prevFunction();
    }
  }

  return <Button onClick={onClick}>{props.children}</Button>;
}

/* 사용에 대한 설명
waitTime이 없으면 한번 눌린 버튼이 promise가 끝날때까지 다시 눌리지 않도록 막아줍니다.
waitTime이 있으면 waitTime동안 입력이 들어오지 못하게 막습니다.

running은 가상의 state로 render에 관여하지 않지만 바뀌면 당연히 render는 다시 합니다.
이를 이용해 prevFunction에서 미리 바꿀만한 state들을 setState해줍니다. (없으면 생략해도 됩니다.)
이후 mutation이나 query등 promise를 반환하는 모든 함수들을 nextFunction에서 처리합니다.
(nextFunction이 없으면 이 컴포넌트를 안 쓰는게 맞습니다.)

추가로 당연히 children에는 한개의 component가 들어가야하며, 
여러개이면 <>--</>으로 묶어주면 됩니다.

style의 경우 자동으로 내용물의 크기에 맞춰집니다.
*/
