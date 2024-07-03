import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import Loading from '@/components/loading';

describe('Loading component', () => {
  it('renders the loading text', () => {
    render(<Loading />);
    const loadingElement = screen.getByText(/Loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    render(<Loading />);
    const containerElement = screen.getByText(/Loading.../i).parentElement;
    expect(containerElement).toHaveClass('loadingContainer');
    expect(screen.getByText(/Loading.../i)).toHaveClass('loading');
  });
});
