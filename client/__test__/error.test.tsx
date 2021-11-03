import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFoundPage from '../src/pages/404';

describe('Home', () => {
  it('renders a heading', () => {
    render(<NotFoundPage />);

    const heading = screen.getByRole('heading', {
      name: /잘못된/i
    });

    expect(heading).toBeInTheDocument();
  });
});
