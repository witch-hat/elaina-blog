import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FormatUnifier } from 'src/utils';

const Context = styled.div({
  display: 'flex',
  width: '700px',
  height: '7rem',
  padding: '.8rem',
  justifyContent: 'left',
  float: 'left',
  marginTop: '5px',
  marginBottom: '20px',
  flexDirection: 'column'
});

const CategoryTitle = styled.p({
  fontSize: '25px',
  fontWeight: 'bold',
  paddingBottom: '0.5rem'
});

const PostTitle = styled.p({
  fontSize: '18px'
});

const EventAndDate = styled.p({
  opacity: '0.5'
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

export default function CommentLogBox(props: Props) {
  const DateDifferent = FormatUnifier.calculateDate(new Date(props.time).getTime());
  const event = props.isEvent === 0 ? `User upload new comment ${DateDifferent}` : `User upload new reply ${DateDifferent}`;
  return (
    <div>
      {/* <UserImage src='/public/images/FakeProfile.png'></UserImage> */}
      <Link href={`post/${props.postId}`}>
        <Context>
          <CategoryTitle>{props.categoryTitle}</CategoryTitle>
          <PostTitle>{props.postTitle}</PostTitle>
          <EventAndDate>{event}</EventAndDate>
        </Context>
      </Link>
    </div>
  );
}
