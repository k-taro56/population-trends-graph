import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import Header from '@/components/header';

jest.mock('../../src/components/styles/header.module.css', () => ({
  title: 'mocked-title-class',
}));

describe('Header component', () => {
  it('renders the header with correct title', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();

    const titleElement = screen.getByRole('heading', { level: 1 });
    expect(titleElement).toHaveTextContent('都道府県別の人口推移グラフ');
    expect(titleElement).toHaveClass('mocked-title-class');
  });
});
