import React, { useImperativeHandle, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div({
  position: 'relative'
});

interface Props {
  children: JSX.Element;
  visible: boolean;
  onClickOutside: Function;
}

export const FocusWrapper = React.forwardRef<HTMLDivElement, Props>((props: Props, forwardedRef) => {
  const focusRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(forwardedRef, () => focusRef.current as HTMLDivElement);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (props.visible && !focusRef.current?.contains(event.target as Node)) {
        props.onClickOutside(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [props]);

  if (props.visible) {
    return <Wrapper ref={focusRef}>{props.children}</Wrapper>;
  } else {
    return null;
  }
});
