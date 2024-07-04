import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import PrefectureList from '@/components/prefecture-list';

describe('PrefectureList Component', () => {
  it('renders prefecture list correctly', () => {
    const mockPrefectures = [
      { prefCode: 1, prefName: 'Hokkaido' },
      { prefCode: 2, prefName: 'Aomori' },
    ];
    const mockOnChange = jest.fn();

    render(
      <PrefectureList
        prefectures={mockPrefectures}
        onPrefectureChange={mockOnChange}
      />,
    );

    expect(screen.getByLabelText('Hokkaido')).toBeInTheDocument();
    expect(screen.getByLabelText('Aomori')).toBeInTheDocument();
  });

  it('calls onPrefectureChange when a checkbox is changed', () => {
    const mockPrefectures = [{ prefCode: 1, prefName: 'Hokkaido' }];
    const mockOnChange = jest.fn();

    render(
      <PrefectureList
        prefectures={mockPrefectures}
        onPrefectureChange={mockOnChange}
      />,
    );
    const checkbox = screen.getByLabelText('Hokkaido');

    fireEvent.click(checkbox);

    expect(mockOnChange).toHaveBeenCalledWith(
      { prefCode: 1, prefName: 'Hokkaido' },
      true,
    );
  });
});
