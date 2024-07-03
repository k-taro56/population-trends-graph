import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';

import Footer from '@/components/footer';

jest.mock('../../src/components/styles/footer.module.css', () => ({
  footer: 'mocked-footer-class',
}));

describe('Footer', () => {
  it('renders the footer text correctly', () => {
    render(<Footer />);
    const footerElement = screen.getByText(
      '出典：RESAS（地域経済分析システム）',
    );
    expect(footerElement).toBeInTheDocument();
  });

  it('applies the correct CSS class', () => {
    render(<Footer />);
    const footerElement = screen.getByText(
      '出典：RESAS（地域経済分析システム）',
    );
    expect(footerElement).toHaveClass('mocked-footer-class');
  });
});
