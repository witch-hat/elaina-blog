import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';

import { Content, ContentNavigation, PostCategory, CommentContainer } from './component';
import { useWidth, FocusWrapper } from 'src/components';

import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/rootReducer';
import { ThemeMode } from 'src/redux/common/type';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '@media screen and (max-width: 767px)': {
    overflowX: 'hidden'
  }
});

const ContentContainer = styled.div<{ isOpenList: boolean }>((props) => ({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '@media screen and (max-width: 1380px)': {
    width: '72%'
  },
  '@media screen and (max-width: 767px)': {
    width: '100%'
  }
}));

const Index = styled.div({
  display: 'none',
  '@media screen and (max-width: 767px)': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,.125)',
    width: '7%',
    position: 'sticky',
    top: 'calc(5rem + 20px)',
    height: '120px',
    borderRadius: '0 12px 12px 0',
    maxWidth: '30px',
    minWidth: '18px'
  }
});

const StyledP = styled.p({
  display: 'inline-block',
  transform: 'rotate(90deg)',
  color: '#222324',
  fontWeight: 'bold',
  flexShrink: 0
});

const FadeOut = keyframes({
  from: {
    opacity: 1
  },
  to: {
    opacity: 0
  }
});

const Alert = styled.div(
  {
    position: 'fixed',
    top: '50%',
    width: '150px',
    height: '150px',
    backgroundColor: 'rgba(0,0,0,.8)',
    color: '#f1f2f3',
    padding: '.5rem',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center'
  },
  css`
    animation: 2.5s ${FadeOut} 1s forwards;
  `
);

export default function Post() {
  const theme: ThemeMode = useSelector<RootState, any>((state) => state.common.theme);
  const width = useWidth();
  const [showPostCategory, setShowPostCategory] = useState(false);
  const isAlerted = useRef<boolean>(false);
  let touchStartX: number;
  let touchStartY: number;
  let touchEndX: number;
  let touchEndY: number;

  function handleTouchStart(event: React.TouchEvent) {
    if (width <= 767) {
      console.log('here');
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }
  }

  function handleTouchEnd(event: React.TouchEvent) {
    if (width <= 767) {
      const touch = event.changedTouches[event.changedTouches.length - 1];
      touchEndX = touch.clientX;
      touchEndY = touch.clientY;

      const touchOffsetX = touchEndX - touchStartX;
      const touchOffsetY = touchEndY - touchStartY;

      if (Math.abs(touchOffsetX) >= 50 && Math.abs(touchOffsetY) <= 20) {
        if (touchOffsetX > 0) {
          setShowPostCategory(true);
        } else {
          setShowPostCategory(false);
        }
      }
    }
  }

  return (
    <Container
      onTouchStart={(event: React.TouchEvent) => handleTouchStart(event)}
      onTouchEnd={(event: React.TouchEvent) => handleTouchEnd(event)}
    >
      {width > 767 ? (
        <PostCategory />
      ) : (
        <FocusWrapper visible={showPostCategory} onClickOutside={() => setShowPostCategory(false)}>
          <PostCategory />
        </FocusWrapper>
      )}
      <ContentContainer isOpenList={showPostCategory}>
        <Content />
        <CommentContainer theme={theme} />
      </ContentContainer>
      <ContentNavigation />
      {/* TODO: Alert shows only first... */}
      {width <= 767 && !isAlerted.current.valueOf() && (
        <Alert onAnimationEnd={() => (isAlerted.current = true)}>
          <p style={{ fontSize: '1.3rem' }}>Swipe LEFT to RIGHT to show list</p>
        </Alert>
      )}
    </Container>
  );
}
