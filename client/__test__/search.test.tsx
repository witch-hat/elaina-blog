import React from 'react';
import { render, screen } from '@testing-library/react';
// import { Header } from '../src/components/header/Header';
import Search from '../src/pages/search';
import { PostDataType } from 'src/query/post';

describe('Layout', () => {
  it('render Layout', () => {
    const searchResult: { post: PostDataType; content: string }[] = [
      {
        post: {
          _id: 1,
          title: 'Test',
          createdAt: 21312903,
          article: 'hello hello',
          categoryId: 0,
          category: null
        },
        content: 'hello'
      }
    ];

    render(<Search searchResult={searchResult} />);

    const contentText = screen.getByText(/hello/g);
    expect(contentText).toBeInTheDocument();
  });
});
