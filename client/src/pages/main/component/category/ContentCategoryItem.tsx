import React from 'react';
import styled from 'styled-components';

import { BorderBox } from 'src/components';
import { CategoryDetails } from 'src/query/category';

import { ContentCategoryDetails } from './ContentCategoryDetails';

const Content = styled.div({
  display: 'flex',
  width: '100%',
  padding: '.8rem',
  justifyContent: 'center',
  alignItems: 'center'
});

const PreviewImage = styled.img({
  display: 'block',
  float: 'right',
  width: '260px',
  height: '8.4rem',
  marginLeft: '1rem',
  objectFit: 'cover',
  overflow: 'hidden',
  '@media screen and (max-width: 1380px)': {
    width: '32%',
    marginLeft: '3%'
  }
});

const PreviewTextWrapper = styled.div({
  display: 'flex',
  width: '100%',
  height: '8.4rem',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center'
});

const PreviewTitle = styled.span({
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
  '@media screen and (max-width: 1380px)': {}
});

const PreviewContent = styled.span({
  display: '-webkit-box',
  width: '100%',
  height: '4.5rem',
  flexShrink: 0,
  fontSize: '1.0rem',
  margin: '.25rem 0 0',
  wordBreak: 'keep-all',
  textAlign: 'left',
  overflow: 'hidden',
  WebkitLineClamp: 3,
  WebkitBoxOrient: 'vertical'
});

interface Props {
  category: CategoryDetails;
  isEmpty?: boolean;
}

function ContentCategoryItem(props: Props) {
  return (
    <BorderBox isTransform={props.isEmpty ? false : true} styles={{ width: '100%', margin: '.8rem 0' }}>
      <Content>
        <PreviewTextWrapper>
          <PreviewTitle>{props.category.title}</PreviewTitle>
          <PreviewContent>{props.category.description}</PreviewContent>
          <ContentCategoryDetails time={props.category.recentCreatedAt} count={props.category.postCount} />
        </PreviewTextWrapper>
        <PreviewImage src={props.category.previewImage} alt={`${props.category.title} preview image`} />
      </Content>
    </BorderBox>
  );
}

export default React.memo(ContentCategoryItem);
