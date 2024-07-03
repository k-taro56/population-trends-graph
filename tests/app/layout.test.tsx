import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';

import RootLayout, { metadata } from '@/app/layout';

describe('RootLayout', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );
    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('has correct lang attribute', () => {
    const { container } = render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>,
    );
    expect(container.querySelector('html')).toHaveAttribute('lang', 'ja');
  });

  it('has correct metadata', () => {
    expect(metadata.title).toBe('都道府県別の人口推移グラフ');
    expect(metadata.description).toBe(
      '都道府県別の人口推移グラフを推計値も合わせて表示します。',
    );
  });
});
