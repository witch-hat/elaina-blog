import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

import { Content, ContentNavigation, PostCategory, CommentContainer } from './component';
import { useWidth } from 'src/components';

const Container = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  '@media screen and (max-width: 768px)': {
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
  '@media screen and (max-width: 768px)': {
    width: '100%'
  }
}));

const Index = styled.div({
  display: 'none',
  '@media screen and (max-width: 768px)': {
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
  const width = useWidth();
  const [showPostCategory, setShowPostCategory] = useState(false);

  useEffect(() => {
    let touchStartX: number;
    let touchStartY: number;
    let touchEndX: number;
    let touchEndY: number;
    function handleTouchStart(event: React.TouchEvent<HTMLElement>) {
      const touch = event.touches[0];
      touchStartX = touch.clientX;
      touchStartY = touch.clientY;
    }

    function handleTouchEnd(event: React.TouchEvent<HTMLElement>) {
      const touch = event.changedTouches[event.changedTouches.length - 1];
      touchEndX = touch.clientX;
      touchEndY = touch.clientY;

      const touchOffsetX = touchEndX - touchStartX;
      const touchOffsetY = touchEndY - touchStartY;

      if (Math.abs(touchOffsetX) >= 80 && Math.abs(touchOffsetY) <= 20) {
        if (touchOffsetX > 0) {
          console.log(touchOffsetX);
          setShowPostCategory(true);
        } else {
          console.log(touchOffsetX);
          setShowPostCategory(false);
        }
      }
    }

    if (width <= 768) {
      window.addEventListener('touchstart', (event: React.TouchEvent<HTMLElement>) => handleTouchStart(event));
      window.addEventListener('touchend', (event: React.TouchEvent<HTMLElement>) => handleTouchEnd(event));

      return () => {
        window.removeEventListener('touchstart', (event: React.TouchEvent<HTMLElement>) => handleTouchStart(event));
        window.removeEventListener('touchend', (event: React.TouchEvent<HTMLElement>) => handleTouchEnd(event));
      };
    }
  }, [width]);

  return (
    <Container>
      {(width > 768 || showPostCategory) && <PostCategory />}
      {/* <Index onClick={() => setShowPostCategory(!showPostCategory)}>
        <StyledP>Show List</StyledP>
      </Index> */}
      <ContentContainer isOpenList={showPostCategory}>
        <Content />
        <CommentContainer />
      </ContentContainer>
      <ContentNavigation />
      {width <= 768 && (
        <Alert>
          <p style={{ fontSize: '1.3rem' }}>Swipe LEFT to RIGHT to show list</p>
        </Alert>
      )}
    </Container>
  );
}
