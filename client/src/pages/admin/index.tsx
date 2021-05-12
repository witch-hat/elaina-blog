import React from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

import { AdminPageLayout } from './component/AdminPageLayout';
import { AppCommonProps, appCommponProps } from '../_app';
import styled from 'styled-components';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { Router } from 'next/router';

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

interface ServerSideProps {}

interface Props extends AppCommonProps, ServerSideProps {}

export default function Admin(props: Props) {
  return (
    <AdminPageLayout>
      <Container>
        <div>Admin log</div>
        <div>
          <UserImage src='/public/images/FakeProfile.png'></UserImage>
          <div>user Upload 1 Month ago</div>
          <Link href='./post/1'>
            <Context>
              <p>Styled component</p>
              Preview context
              <h6>time</h6>
            </Context>
          </Link>
        </div>
        <div>
          <UserImage src='/public/images/FakeProfile.png'></UserImage>
          <div>user Upload 1 Month ago</div>
          <Link href='./post/1'>
            <Context>
              <p>Styled component</p>
              Comment
              <h6>time</h6>
            </Context>
          </Link>
        </div>
        <div>
          <UserImage src='/public/images/FakeProfile.png'></UserImage>
          <div>user Upload 1 Month ago</div>
          <Link href='./post/1'>
            <Context>
              <p>Styled component</p>
              New Category
              <h6>time</h6>
            </Context>
          </Link>
        </div>
        <div>
          <UserImage src='/public/images/FakeProfile.png'></UserImage>
          <div>user Upload 1 Month ago</div>
          <Link href='./post/1'>
            <Context>
              <p>Styled component</p>
              Delete Category
              <h6>time</h6>
            </Context>
          </Link>
        </div>
      </Container>
    </AdminPageLayout>
  );
}

const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
  if (!appCommponProps.app.isLogin) {
    return {
      redirect: {
        permanent: false,
        destination: '/admin/login'
      }
    };
  }

  return {
    props: {}
  };
};
