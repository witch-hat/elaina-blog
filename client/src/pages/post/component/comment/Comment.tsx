import React, { useState } from 'react';
import styled from 'styled-components';

import { BorderBox } from 'src/components';
import CommentEditor from './CommentEditor';
import { ThemeMode } from 'src/redux/common/type';

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
  '@media screen and (max-width: 767px)': {
    margin: '0 0 .2rem'
  }
});

const InformationContainer = styled.div({
  display: 'flex',
  fontSize: '.8rem',
  alignItems: 'center',
  '@media screen and (max-width: 767px)': {
    flexDirection: 'column',
    alignItems: 'flex-start'
  }
});

const Author = styled.div({
  marginRight: '.7rem',
  display: 'flex',
  alignItems: 'center',
  '@media screen and (max-width: 767px)': {
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

const ReplyButton = styled.span({
  padding: '0 .5rem',
  textAlign: 'right',
  fontSize: '.8rem',
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    textDecoration: 'solid underline #1f2f3f 1px'
  }
});

const ReplyContainer = styled.div({
  width: '95%',
  margin: '.5rem',
  padding: '.5rem',
  borderRadius: '12px',
  backgroundColor: 'rgba(0,0,0,.01)'
});

interface Props {
  theme: ThemeMode;
}

export default function Comment(props: Props) {
  const [isShowingReply, setIsShowingReply] = useState(false);
  const [isAddReply, setIsAddReply] = useState(false);

  return (
    <div>
      <BorderBox isTransform={false} styles={{ margin: '1rem 0 0', width: '100%' }} theme={props.theme}>
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
            <ReplyButton onClick={() => setIsShowingReply(!isShowingReply)}>{`${isShowingReply ? 'Hide' : 'Show'} Reply`}</ReplyButton>
            <ReplyButton onClick={() => setIsAddReply(!isAddReply)}>{isAddReply ? 'Cancel' : `Add Reply`}</ReplyButton>
          </ReplyButtonContainer>
          {isAddReply ? <CommentEditor theme={props.theme} /> : null}
          {isShowingReply ? (
            <ReplyContainer>
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
              <CommentContent>Hello</CommentContent>
            </ReplyContainer>
          ) : null}
        </CommentContainer>
      </BorderBox>
    </div>
  );
}
