import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
<<<<<<< Updated upstream
=======
import { FormatUnifier } from 'src/utils';
>>>>>>> Stashed changes

const Context = styled.div({
  display: 'flex',
  width: '700px',
  height: '5rem',
  padding: '.8rem',
  border: '2px solid',
  borderRadius: '0.4rem',
  justifyContent: 'left',
  float: 'left',
  marginTop: '5px',
  marginBottom: '20px',
  flexDirection: 'column',
  '&:hover': {
    opacity: '0.3'
  }
});

const CategoryTitle = styled.div({
  fontSize: '15px',
  paddingBottom: '0.5rem'
});

const PostTitle = styled.div({
  fontSize: '15px'
});

const DateText = styled.span({
  opacity: '0.6',
  paddingLeft: '6px',
  fontSize: '12px'
});

const EventText = styled.div({
  fontSize: '15px'
});

const UserImage = styled.img({
  display: 'block',
  float: 'left',
  width: '40px',
  height: '40px',
  objectFit: 'cover',
  marginRight: '5px',
  '@media screen and (max-width: 1380px)': {
    width: '40px'
  }
});

interface Props {
  time: Date;
  categoryTitle: string;
  postId: number;
  postTitle: string;
  isEvent: number;
}

<<<<<<< Updated upstream
function calculateDate(date: number) {
  let DateDiff = ``;
  if (date >= 60000) {
    DateDiff = `${(date / 60000).toFixed()} Minutes a go`;
  }
  if (date >= 3600000) {
    DateDiff = `${(date / 3600000).toFixed()} Hours a go`;
  }
  if (date >= 86400000) {
    DateDiff = `${(date / 86400000).toFixed()} Days a go`;
  }
  if (date >= 31536000000) {
    DateDiff = `${(date / 31536000000).toFixed()} Years a go`;
  }
  return DateDiff;
}

export default function CommentLogBox(props: Props) {
  const now = new Date().getTime() - new Date(props.time).getTime();
  const DateDifferent = calculateDate(now);
  const event = props.isEvent === null ? `new comment` : `new reply`;
=======
export default function CommentLogBox(props: Props) {
  const DateDifferent = FormatUnifier.calculateDate(new Date(props.time).getTime());
  const event = props.isEvent === 0 ? `User upload new comment ${DateDifferent}` : `User upload new reply ${DateDifferent}`;
>>>>>>> Stashed changes
  return (
    <div>
      {/* <UserImage src='/public/images/FakeProfile.png'></UserImage> */}
      <EventText>
        User upload {event}
        <DateText>{DateDifferent}</DateText>
      </EventText>
      <Link href={`post/${props.postId}`}>
        <Context>
          <CategoryTitle> '{props.categoryTitle}' category, </CategoryTitle>
          <PostTitle>
            {event} at '{props.postTitle}'
          </PostTitle>
        </Context>
      </Link>
    </div>
  );
}
