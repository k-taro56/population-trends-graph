import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';
import { usePrefectures, usePopulationCompositions } from '@/hooks';

jest.mock('../../src/hooks', () => ({
  usePrefectures: jest.fn(),
  usePopulationCompositions: jest.fn(),
}));

describe('Home component', () => {
  beforeEach(() => {
    (usePrefectures as jest.Mock).mockReset();
    (usePopulationCompositions as jest.Mock).mockReset();
  });

  it('renders prefecture list when prefectures are loaded', async () => {
    const mockPrefectures = [{ prefCode: 1, prefName: 'Tokyo' }];
    (usePrefectures as jest.Mock).mockReturnValue({ data: mockPrefectures });
    (usePopulationCompositions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<Home />);
    await waitFor(() => {
      expect(screen.getByText('Tokyo')).toBeInTheDocument();
    });
  });

  it('displays message when no prefecture is selected', async () => {
    const mockPrefectures = [{ prefCode: 1, prefName: 'Tokyo' }];
    (usePrefectures as jest.Mock).mockReturnValue({ data: mockPrefectures });
    (usePopulationCompositions as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
    });

    render(<Home />);
    await waitFor(() => {
      expect(
        screen.getByText('都道府県を選択してください。'),
      ).toBeInTheDocument();
    });
  });
});
