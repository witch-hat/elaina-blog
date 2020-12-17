import React, { useState } from 'react';
import styled from 'styled-components';

import { BorderBox } from 'src/components';

const CommentContainer = styled.div({
  width: '98%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '8rem',
  padding: '.5rem'
});

const DetailsContainer = styled.div({
  display: 'flex',
  width: '100%',
  height: '2.1rem',
  justifyContent: 'space-between',
  '@media screen and (max-width: 768px)': {
    margin: '0 0 .2rem'
  }
});

const InformationContainer = styled.div({
  display: 'flex',
  fontSize: '.8rem',
  alignItems: 'center',
  '@media screen and (max-width: 768px)': {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});

const Author = styled.div({
  marginRight: '.7rem',
  display: 'flex',
  alignItems: 'center',
  '@media screen and (max-width: 768px)': {
    margin: '0 0 .2rem'
  }
});

const MenuButton = styled.div({
  fontSize: '.8rem',
  padding: '.5rem .8rem',
  cursor: 'pointer',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#eee'
  }
});

const CommentContent = styled.p({
  margin: '2rem 0',
  display: 'flex',
  alignItems: 'center',
  width: '100%'
});

const ReplyButtonContainer = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const Reply = styled.span({
  padding: '0 .5rem',
  textAlign: 'right',
  fontSize: '.8rem',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    textDecoration: 'solid underline #1f2f3f 1px'
  }
});

export default function Comment() {
  const [isShowingReply, setIsShowingReply] = useState(false);
  const [isAddReply, setIsAddReply] = useState(false);

  return (
    <div>
      <BorderBox isTransform={false} styles={{ margin: '1rem 0 0', width: '100%' }}>
        <CommentContainer>
          <DetailsContainer>
            <InformationContainer>
              <Author>
                <i className='fas fa-user'></i>&nbsp;Hoit
              </Author>
              <span>
                <i className='far fa-clock'></i>&nbsp;2020.12.14 15:50
              </span>
            </InformationContainer>
            <MenuButton>
              <i className='fas fa-ellipsis-v'></i>
            </MenuButton>
          </DetailsContainer>
          <CommentContent>으으...</CommentContent>
          <ReplyButtonContainer>
            <Reply onClick={() => setIsShowingReply(!isShowingReply)}>{`${isShowingReply ? 'Hide' : 'Show'} Reply`}</Reply>
            <Reply onClick={() => setIsAddReply(!isAddReply)}>{isAddReply ? 'Cancel' : `Add Reply`}</Reply>
          </ReplyButtonContainer>
        </CommentContainer>
      </BorderBox>
    </div>
  );
}
