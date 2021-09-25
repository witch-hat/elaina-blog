import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FormatUnifier } from 'src/utils';

const Context = styled.div((props) => ({
  display: 'flex',
  float: 'left',
  width: '100%',
  height: '5rem',
  padding: '.8rem',
  marginTop: '5px',
  marginBottom: '20px',
  border: `1px solid ${props.theme.borderColor}`,
  borderRadius: '.4rem',
  justifyContent: 'left',
  flexDirection: 'column',
  '&:hover > p: first-child': {
    color: props.theme.navList.selectedColor,
    cursor: 'pointer'
  }
}));

const CategoryTitle = styled.p({
  paddingBottom: '0.5rem',
  fontSize: '25px',
  fontWeight: 'bold'
});

const PostTitle = styled.p({
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '0.5rem'
});

const EventAndDate = styled.p({
  opacity: '0.5',
  fontSize: '0.7rem'
});

// const UserImage = styled.img({
//   display: 'block',
//   float: 'left',
//   width: '40px',
//   height: '40px',
//   marginRight: '5px',
//   objectFit: 'cover',
//   '@media screen and (max-width: 1380px)': {
//     width: '40px'
//   }
// });

interface Props {
  time: number;
  postId: number;
  postTitle: string;
  isEvent: number | null;
}

export function CommentLogBox(props: Props) {
  const dateDifferent = FormatUnifier.calculateDate(new Date(props.time));
  const event = props.isEvent === null ? `User upload new comment ${dateDifferent}` : `User upload new reply ${dateDifferent}`;
  return (
    <div>
      {/* <UserImage src='/public/images/FakeProfile.png'></UserImage> */}
      <Link href={`/post/${props.postId}`} passHref={true}>
        <Context>
          <PostTitle>{props.postTitle}</PostTitle>
          <EventAndDate>{event}</EventAndDate>
        </Context>
      </Link>
    </div>
  );
}
