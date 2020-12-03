import React from 'react';
import { Content } from '../../components/pages/post/Content';
import { ContentNavigation } from '../../components/pages/post/ContentNavigation';
import { PostCategory } from '../../components/pages/post/PostCategory';

export default function Post() {
  return (
    <div>
      <PostCategory />
      <Content />
      <ContentNavigation />
      <a>dsaeqw</a>
    </div>
  );
}
