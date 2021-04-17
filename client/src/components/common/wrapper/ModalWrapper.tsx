import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div((props) => {
  return {
    width: '100%',
    height: '100%',
    position: 'fixed',
    overflowX: 'hidden',
    zIndex: 1000,
    top: 0,
    right: 0,
    display: 'flex',
    tabIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  };
});

const WrapperInner = styled.div({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0px 0px 4px 4px rgba(0,0,0,0.25)',
  padding: '16px',
  width: 'fit-content',
  height: 'fit-content',
  margin: '0 auto',
  backgroundColor: '#fff',
  borderRadius: '.5rem'
});

// let ModalWrapperHashId = 0;
// let usedLockHashId = -1;
// let callBack = () => {};

// function lockScroll(hashId: number | undefined) {
//   if (usedLockHashId === -1 && typeof hashId === 'number') {
//     usedLockHashId = hashId;

//     const yOffset = window.pageYOffset;
//     callBack = () => {
//       window.scrollTo(0, yOffset);
//     };
//     window.addEventListener('scroll', callBack);
//   }
// }

// function unLockScroll(hashId: number | undefined) {
//   if (usedLockHashId === hashId) {
//     window.removeEventListener('scroll', callBack);
//     usedLockHashId = -1;
//   }
// }

interface Props {
  visible: boolean;
  children: JSX.Element | JSX.Element[];
}

export function ModalWrapper(props: Props) {
  // const hashId = useRef<number>();
  const modalRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   hashId.current = ModalWrapperHashId;
  //   ModalWrapperHashId++;
  // }, []);

  if (props.visible) {
    // lockScroll(hashId.current);
    return (
      <Wrapper ref={modalRef}>
        <WrapperInner>{props.children}</WrapperInner>
      </Wrapper>
    );
  } else {
    // unLockScroll(hashId.current);
    return null;
  }
}

ModalWrapper.defaultProps = {
  visible: false
};
