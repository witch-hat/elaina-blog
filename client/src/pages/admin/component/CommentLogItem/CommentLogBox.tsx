import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div({
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '.9rem 0',
  flexDirection: 'column',
  '& > div:nth-child(1)': {
    margin: '0 0 .8rem !important'
  }
});

const Context = styled.div({
  display: 'flex',
  width: '700px',
  height: '7rem',
  padding: '.8rem',
  justifyContent: 'left',
  border: '2px solid #666',
  borderRadius: '12px',
  float: 'left',
  marginTop: '5px',
  marginBottom: '20px',
  flexDirection: 'column'
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
  CategoryId: number;
  postId: number;
  _id: number;
}

export default function CommentLogBox(props: Props) {
  const now = new Date();
  return (
    <div>
      {/* <UserImage src='/public/images/FakeProfile.png'></UserImage> */}
      <div>
        {props._id}
        {props.time}
      </div>
      <Link href={`post/${props.postId}`}>
        <Context>
          <p>{props.CategoryId}</p>
        </Context>
      </Link>
    </div>
  );
}
