import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import { BorderBox, NoImage } from 'src/components';
import { CategoryDetailType } from 'src/query/category';

import { ContentCategoryDetails } from './ContentCategoryDetails';

const Container = styled.a({
  display: 'block',
  width: '32%',
  height: 'max-content'
});

const Content = styled.div({
  display: 'flex',
  width: '100%',
  padding: '1.5rem 1rem',
  flexDirection: 'column',
  justifyContent: 'space-between'
});

const ImageContainer = styled.div({
  display: 'flex',
  width: '100%',
  marginBottom: '.75rem',
  justifyContent: 'center'
});

// const PreviewImage = styled.img({
//   display: 'block',
//   float: 'right',
//   width: '260px',
//   height: '8.4rem',
//   marginLeft: '1rem',
//   objectFit: 'cover',
//   overflow: 'hidden',
//   '@media screen and (max-width: 1380px)': {
//     width: '32%',
//     marginLeft: '3%'
//   }
// });

const PreviewTextWrapper = styled.div({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  '&:hover': {
    cursor: 'ponter'
  }
});

const CategoryTitle = styled.p<{ null?: boolean }>((props) => ({
  display: '-webkit-box',
  width: '100%',
  height: '1.8rem',
  flexShrink: 0,
  textAlign: 'left',
  fontSize: '1.2rem',
  fontWeight: 'bold',
  wordBreak: 'break-all',
  overflow: 'hidden',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  '&:hover': {
    cursor: props.null ? 'default' : 'pointer'
  },
  '@media screen and (max-width: 1380px)': {}
}));

// const LatestPostArticle = styled.p<{ null?: boolean }>((props) => ({
//   display: '-webkit-box',
//   width: '100%',
//   height: '4.5rem',
//   flexShrink: 0,
//   fontSize: '1.0rem',
//   margin: '.25rem 0 0',
//   wordBreak: 'keep-all',
//   textAlign: 'left',
//   overflow: 'hidden',
//   WebkitLineClamp: 3,
//   WebkitBoxOrient: 'vertical',
//   '&:hover': {
//     cursor: props.null ? 'default' : 'pointer'
//   }
// }));

interface Props {
  category: CategoryDetailType;
  isLogin?: boolean;
  isEmpty?: boolean;
}

export function ContentCategoryItem(props: Props) {
  return (
    <Link href={`/category/${props.category._id}`}>
      <Container>
        <BorderBox isHoverEffect={true} styles={{ width: '100%', margin: '4% 0' }}>
          <Content>
            <ImageContainer>
              <NoImage width={215} height={215} />
            </ImageContainer>
            <PreviewTextWrapper>
              <CategoryTitle>{props.category.title}</CategoryTitle>
              {/* <LatestPostArticle>{props.latestPost.article}</LatestPostArticle> */}
              {/* <ContentCategoryDetails time={props.category.recentCreatedAt} count={props.category.postCount} /> */}
              <ContentCategoryDetails time={props.category.recentCreatedAt} count={props.category.postCount} />
            </PreviewTextWrapper>
            {/* {!(width <= 767) && <PreviewImage src={props.category.previewImage} alt={`${props.category.title} preview image`} />} */}
          </Content>
        </BorderBox>
      </Container>
    </Link>
  );
}
