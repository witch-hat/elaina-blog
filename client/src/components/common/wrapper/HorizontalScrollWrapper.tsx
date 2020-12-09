import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Container = styled.div({
  width: '100%',
  overflowX: 'auto'
});

interface Props {
  children: JSX.Element;
}

export function HorizontalScrollWrapper(props: Props) {
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('useEffect');
    window.addEventListener('wheel', scrollHorizontalHandler);

    return window.removeEventListener('wheel', scrollHorizontalHandler);
  });

  function scrollHorizontalHandler(event: WheelEvent) {
    console.log('init function');
    if (horizontalRef.current?.contains(event.target as Node)) {
      horizontalRef.current.scrollLeft -= event.deltaY * 30;
    }
    event.preventDefault();
  }

  return <Container ref={horizontalRef}>{props.children}</Container>;
}
