import styled from 'styled-components';
import Link from 'next/link';

import { BorderBox } from 'src/components';
import ContentCategoryDetails from './ContentCategoryDetails';

const Title = styled.span({
  display: 'block',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  margin: '25px 0 0'
});

const Container = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '.9rem 0',
  justifyContent: 'center',
  alignItems: 'center',
  '& > div:nth-child(1)': {
    margin: '0 0 .8rem !important'
  }
});

const Content = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  padding: '.8rem',
  height: '10rem'
});

const PreviewImage = styled.img({
  width: '260px',
  marginLeft: '1rem',
  height: '8.4rem',
  objectFit: 'cover',
  float: 'right',
  '@media screen and (max-width: 1280px)': {
    width: '32%',
    marginLeft: '3%'
  }
});

const PreviewTextWrapper = styled.div({
  width: '100%',
  display: 'flex',
  height: '8.4rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center'
});

const PreviewTitle = styled.span({
  flexShrink: 0,
  height: '2rem',
  width: '100%',
  fontSize: '1.4rem',
  fontWeight: 'bold',
  textAlign: 'left',
  wordBreak: 'keep-all',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '@media screen and (max-width: 1280px)': {
    wordBreak: 'break-all'
  }
});

const PreviewContent = styled.span({
  flexShrink: 0,
  width: '100%',
  height: '4.5rem',
  fontSize: '1.1rem',
  margin: '.25rem 0 0',
  wordBreak: 'keep-all',
  textAlign: 'left',
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

interface Props {}

export default function ContentCategory() {
  return (
    <section style={{ width: '100%' }}>
      <Title>Content Category</Title>
      <Container>
        <Link href='/post' passHref>
          <a style={{ width: '100%' }}>
            <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
              <Content>
                <PreviewTextWrapper>
                  <PreviewTitle>React</PreviewTitle>
                  <PreviewContent>PreviewContent</PreviewContent>
                  <ContentCategoryDetails />
                </PreviewTextWrapper>
                <PreviewImage src='/images/FakeProfile.png' alt='preview image' />
              </Content>
            </BorderBox>
          </a>
        </Link>
        <Link href='/post'>
          <a style={{ width: '100%' }}>
            <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
              <Content>
                <PreviewTextWrapper>
                  <PreviewTitle>Very long long long long long long long long longlonglonglonglonglonglonglonglong</PreviewTitle>
                  <PreviewContent>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </PreviewContent>
                  <ContentCategoryDetails />
                </PreviewTextWrapper>
                <PreviewImage src='/images/FakeProfile.png' alt='preview image' />
              </Content>
            </BorderBox>
          </a>
        </Link>
        <Link href='/post'>
          <a style={{ width: '100%' }}>
            <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
              <Content>
                <PreviewTextWrapper>
                  <PreviewTitle>Vue.js</PreviewTitle>
                  <PreviewContent>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </PreviewContent>
                  <ContentCategoryDetails />
                </PreviewTextWrapper>
                <PreviewImage src='/images/FakeProfile.png' alt='preview image' />
              </Content>
            </BorderBox>
          </a>
        </Link>
        <Link href='/post'>
          <a style={{ width: '100%' }}>
            <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
              <Content>
                <PreviewTextWrapper>
                  <PreviewTitle>Data Structure</PreviewTitle>
                  <PreviewContent>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </PreviewContent>
                  <ContentCategoryDetails />
                </PreviewTextWrapper>
                <PreviewImage src='/images/FakeProfile.png' alt='preview image' />
              </Content>
            </BorderBox>
          </a>
        </Link>
        <Link href='/post'>
          <a style={{ width: '100%' }}>
            <BorderBox isTransform={true} styles={{ width: '100%', margin: '.8rem 0' }}>
              <Content>
                <PreviewTextWrapper>
                  <PreviewTitle>No Image</PreviewTitle>
                  <PreviewContent>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
                    dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more
                    recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                  </PreviewContent>
                  <ContentCategoryDetails />
                </PreviewTextWrapper>
              </Content>
            </BorderBox>
          </a>
        </Link>
      </Container>
    </section>
  );
}
